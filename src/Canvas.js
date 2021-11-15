import React, { useRef, useEffect } from "react";

const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const Canvas = ({ items = [] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");

    ctx.canvas.width = 1000;
    ctx.canvas.height = 1000;

    ctx.lineWidth = "1";
    ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const item of items) {
      ctx.fillStyle = randomColor();
      ctx.fillRect(item.x, item.y, item.w, item.h);
    }
  }, [items]);

  return <canvas style={{ width: 1000, height: 1000 }} ref={canvasRef} />;
};

export default Canvas;
