import React, { useRef, useEffect } from "react";
import { DrawerBox } from "../../components";

const Drawer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext("2d");

    const initialTriangleCorners = [
      { x: 150, y: 100 },
      { x: 100, y: 200 },
      { x: 200, y: 200 },
    ];

    const drawTriangle = (corners) => {
      const [corner1, corner2, corner3] = corners;

      context.beginPath();
      context.moveTo(corner1.x, corner1.y);
      context.lineTo(corner2.x, corner2.y);
      context.lineTo(corner3.x, corner3.y);
      context.closePath();
      context.stroke();
    };

    drawTriangle(initialTriangleCorners);

    const getClickedCorner = (event) => {
      const { offsetX, offsetY } = event;
      const clickedCornerIndex = initialTriangleCorners.findIndex(
        (corner) =>
          corner.x > offsetX - 10 &&
          corner.x < offsetX + 10 &&
          corner.y > offsetY - 10 &&
          corner.y < offsetY + 10
      );
      return clickedCornerIndex;
    };

    canvas.addEventListener("mousedown", (e) => {
      const clickedCorner = getClickedCorner(e);
      if (![-1, undefined].includes(clickedCorner)) {
        canvas.addEventListener("mousemove", (e) => {
          initialTriangleCorners[clickedCorner].x = e.offsetX;
          initialTriangleCorners[clickedCorner].y = e.offsetY;
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawTriangle(initialTriangleCorners);
        });
      }
    });
  }, []);

  return (
    <DrawerBox>
      <canvas ref={canvasRef} />
    </DrawerBox>
  );
};

export default Drawer;
