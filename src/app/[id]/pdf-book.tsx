import React, { useState, useRef, useCallback, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Image from "next/image";
import { Document, Page } from "react-pdf";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
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

  const [rectangle, setRectangle] = useState<Rectangle | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocumentRef = useRef<PDFDocumentProxy | null>(null);
  const pdfPageRef = useRef<PDFPageProxy | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const drawRectangle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rectangle) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }, [rectangle]);

  useEffect(() => {
    drawRectangle();
  }, [drawRectangle]);

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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      startPoint.x,
      startPoint.y,
      x - startPoint.x,
      y - startPoint.y,
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

    setRectangle(newRectangle);
    setIsDrawing(false);
    setStartPoint(null);

    cropAndConvertImage(newRectangle);
  };

  const cropAndConvertImage = async (rect: Rectangle) => {
    if (!pdfPageRef.current) return;

    const page = pdfPageRef.current;
    const viewport = page.getViewport({ scale: 1 });

    // Create a new canvas for the cropped area
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size to the cropped area
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Calculate the portion of the PDF to render
    const scaledRect = {
      x: (rect.x * viewport.width) / canvasRef.current!.width,
      y: (rect.y * viewport.height) / canvasRef.current!.height,
      width: (rect.width * viewport.width) / canvasRef.current!.width,
      height: (rect.height * viewport.height) / canvasRef.current!.height,
    };

    // Render the specific part of the page
    await page.render({
      canvasContext: context,
      viewport: page.getViewport({
        scale: canvasRef.current!.width / viewport.width,
        offsetX: -scaledRect.x,
        offsetY: -scaledRect.y,
      }),
    }).promise;

    // Convert to base64
    const base64Image = canvas.toDataURL("image/png");
    setCroppedImage(base64Image);

    // Convert base64 to bytes
    const byteCharacters = atob(base64Image.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    console.log("Cropped image as bytes:", byteArray);
  };

  const handlePageRender = useCallback(
    (page: PDFPageProxy) => {
      pdfPageRef.current = page;
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        drawRectangle();
      }
    },
    [drawRectangle],
  );

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

        {croppedImage && (
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">
              Cropped Image Preview:
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={croppedImage}
              alt="Cropped area"
              className="border border-gray-300"
            />
          </div>
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
        onLoadSuccess={(pdf) => {
          pdfDocumentRef.current = pdf;
          handleDocumentLoadSuccess(pdf);
        }}
        onLoadError={console.error}
      >
        <div style={{ position: "relative" }}>
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
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "all",
            }}
          />
        </div>
      </Document>
    </>
  );
};
