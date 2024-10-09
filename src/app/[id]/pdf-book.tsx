import React, { useState, useRef, useCallback, useEffect } from 'react';
import "react-pdf/dist/Page/AnnotationLayer.css";
import Image from "next/image";
import { Document, Page } from "react-pdf";
import { usePDFBook } from "@/hooks/use-pdf-book";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import type { Book, Message } from "@prisma/client";
import type { User } from "next-auth";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  book: Book;
  user: User | null;
  history: Message[];
  loadHistory: () => void;
}

export const PDFBook = ({ book, user, history, loadHistory }: Props) => {
  const {
    numPages,
    currentPage,
    noPrevPage,
    noNextPage,
    isEditing,
    setCurrentPage,
    setIsEditing,
    handlePrevPage,
    handleNextPage,
    handleDocumentLoadSuccess,
  } = usePDFBook(book.id);

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawRectangles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    rectangles.forEach((rect) => {
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  }, [rectangles]);

  useEffect(() => {
    drawRectangles();
  }, [drawRectangles]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangles();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      startPoint.x,
      startPoint.y,
      x - startPoint.x,
      y - startPoint.y
    );
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRectangle: Rectangle = {
      x: Math.min(startPoint.x, x),
      y: Math.min(startPoint.y, y),
      width: Math.abs(x - startPoint.x),
      height: Math.abs(y - startPoint.y),
    };

    setRectangles([...rectangles, newRectangle]);
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handlePageRender = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const page = canvas.parentElement?.querySelector('.react-pdf__Page') as HTMLElement;
      if (page) {
        canvas.width = page.offsetWidth;
        canvas.height = page.offsetHeight;
        drawRectangles();
      }
    }
  }, [drawRectangles]);

  return (
    <>
      <button
        className="fixed left-3 top-1/2 z-10 disabled:text-gray-400"
        disabled={noPrevPage}
        onClick={handlePrevPage}
      >
        <Icons.left className="h-8 w-8" />
      </button>

      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center justify-center gap-3">
            <Input
              className="ml-2 w-16"
              onChange={(event) =>
                setCurrentPage(Number(event.currentTarget.value))
              }
            />
            <Button onClick={() => setIsEditing(false)}>OK</Button>
          </div>
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center font-bold"
          >
            {currentPage}-бет (жалпы {numPages})
          </span>
        )}

        {/* {user?.canUseAI && ( */}
        {user && (
          <Dialog onOpenChange={loadHistory}>
            <DialogTrigger
              className={cn(buttonVariants(), "flex items-center gap-3")}
            >
              <Icons.ai className="h-4 w-4" />
              AI
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{book.title}</DialogTitle>
                <DialogDescription>
                  Жасанды интеллект кейде шындыққа жанаспайтын жауаптар беруі
                  мүмкін.
                </DialogDescription>
              </DialogHeader>
              <Chat
                book={book}
                user={user}
                initialMessages={history.map((message) => ({
                  id: message.id,
                  content: message.content,
                  role: message.isAI ? "assistant" : "user",
                }))}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <button
        className="fixed right-3 top-1/2 z-10 disabled:text-gray-400"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <Icons.right className="h-8 w-8" />
      </button>
      <Document
        className="mt-3 flex flex-col items-center justify-center border-t xl:flex-row"
        loading={
          <div className="mt-3 flex items-center justify-center gap-2">
            <Icons.spinner className="animate-spin" />
            Кітап ашылуда...
          </div>
        }
        error={
          <div className="mt-3 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Icons.x />
              <span>Шығарма жүктелмеген.</span>
            </div>
            <Image
              className="mt-6"
              alt="Failed to load."
              src="/failed.svg"
              width={599}
              height={417}
            />
          </div>
        }
        file={book.fileUrl}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <div style={{ position: 'relative' }}>
          <Page
            noData={`Бұндай бет (${currentPage}-бет) жоқ`}
            error="Бетті жүктеуде қате туындады"
            loading="Бет жүктелуде..."
            renderTextLayer={false}
            pageNumber={currentPage}
            onRenderSuccess={handlePageRender}
          />
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'all',
            }}
          />
        </div>
        {currentPage + 1 <= numPages && (
          <Page
            noData={`Бұндай бет (${currentPage + 1}-бет) жоқ`}
            error="Бетті жүктеуде қате туындады"
            loading="Бет жүктелуде..."
            renderTextLayer={false}
            pageNumber={currentPage + 1}
          />
        )}
      </Document>
    </>
  );
};
