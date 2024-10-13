import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { isValidRectangle } from "@/lib/utils";
import { toast } from "sonner";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const usePDFBook = (bookId: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const hasMultiplePages = numPages >= 3;

  const noPrevPage = !hasMultiplePages || currentPage === 1;
  const noNextPage =
    !hasMultiplePages ||
    currentPage === numPages ||
    currentPage + 1 === numPages;

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      const newPage = currentPage + 2;
      setCurrentPage(newPage);
      resetRectangle();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 2;
      setCurrentPage(newPage);
      resetRectangle();
    }
  };

  useEffect(() => {
    const getLastPage = () => {
      const id = localStorage.getItem("last-book-id");
      const page = Number(localStorage.getItem("last-book-page"));

      if (id && id === bookId && page) {
        setCurrentPage(page);
      }
    };

    getLastPage();
  }, [bookId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      localStorage.setItem("last-book-page", currentPage.toString());
      localStorage.setItem("last-book-id", bookId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [bookId, currentPage]);

  // For translation

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

  const resetRectangle = () => {
    setIsDrawing(false);
    setRectangle(null);
    setStartPoint(null);
    setCroppedImage(null);
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

    if (!isValidRectangle(newRectangle)) return;

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

  return {
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
    // For translation
    croppedImage,
    rectangle,
    pdfDocumentRef,
    canvasRef,
    handlePageRender,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
