import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { isValidRectangle } from "@/lib/utils";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

export const useRectangle = () => {
  const [rectangle, setRectangle] = useState<Rectangle | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
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

    ctx.strokeStyle = "#6C63FF";
    ctx.lineWidth = 2;
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }, [rectangle]);

  useEffect(() => {
    drawRectangle();
  }, [drawRectangle]);

  const getPointFromEvent = (
    e: React.MouseEvent | React.TouchEvent,
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      // Touch event
      if (e.touches.length === 0) {
        // If no touches, try using changedTouches (for touchend event)
        if (e.changedTouches.length === 0) return null;
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = getPointFromEvent(e);
    if (point) {
      setIsDrawing(true);
      setStartPoint(point);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !startPoint || !canvasRef.current) return;

    const point = getPointFromEvent(e);
    if (!point) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#6C63FF";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      startPoint.x,
      startPoint.y,
      point.x - startPoint.x,
      point.y - startPoint.y,
    );
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !startPoint || !canvasRef.current) return;

    const point = getPointFromEvent(e);
    if (!point) return;

    const newRectangle: Rectangle = {
      x: Math.min(startPoint.x, point.x),
      y: Math.min(startPoint.y, point.y),
      width: Math.abs(point.x - startPoint.x),
      height: Math.abs(point.y - startPoint.y),
    };

    setRectangle(newRectangle);
    setIsDrawing(false);
    setStartPoint(null);

    if (isValidRectangle(newRectangle)) {
      cropAndConvertImage(newRectangle);
    }
  };

  const resetRectangle = () => {
    setIsDrawing(false);
    setRectangle(null);
    setStartPoint(null);
    setCroppedImage(null);
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
    croppedImage,
    rectangle,
    pdfDocumentRef,
    canvasRef,
    handlePageRender,
    handleStart,
    handleMove,
    handleEnd,
    resetRectangle,
  };
};
