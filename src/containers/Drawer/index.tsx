import React, { useRef, useEffect } from "react";
import { DrawerBox } from "components";
import { LIGHT_BLUE, DARK_BLUE } from "utils/constant";

const Drawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext("2d");

      const initialTriangleCorners = [
        { x: 150, y: 100 },
        { x: 100, y: 200 },
        { x: 200, y: 200 },
      ];

      const drawTriangle = (corners: Array<{ x: number; y: number }>) => {
        if (!context) return;
        const [corner1, corner2, corner3] = corners;

        drawCircleAtPoint(corner1);
        drawCircleAtPoint(corner2);
        drawCircleAtPoint(corner3);

        context.beginPath();
        context.moveTo(corner1.x, corner1.y);
        context.lineTo(corner2.x, corner2.y);
        context.lineTo(corner3.x, corner3.y);
        context.closePath();
        context.strokeStyle = LIGHT_BLUE;
        context.stroke();
      };

      const drawCircleAtPoint = (point: { x: number; y: number }) => {
        if (!context) return;
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        context.fillStyle = DARK_BLUE;
        context.fill();
      };

      drawTriangle(initialTriangleCorners);

      const getClickedCorner = (event: MouseEvent) => {
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

      const handleMouseDown = function (event: MouseEvent) {
        if (!context || !canvas) return;
        const clickedCornerIndex = getClickedCorner(event);
        if (clickedCornerIndex === -1) return;

        function handleMouseMove(event: MouseEvent) {
          if (!context || !canvas) return;
          const { offsetX, offsetY } = event;
          initialTriangleCorners[clickedCornerIndex] = {
            x: offsetX,
            y: offsetY,
          };
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawTriangle(initialTriangleCorners);
        }

        function handleMouseUp() {
          if (!canvas) return;
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
        }

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
      };

      canvas.addEventListener("mousedown", handleMouseDown);

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
      };
    }
  }, []);

  return (
    <DrawerBox>
      <canvas ref={canvasRef} />
    </DrawerBox>
  );
};

export default Drawer;
