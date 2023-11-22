import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { MainModel } from "./MainModel";
import "../../assets/styles/canvas.css";
export const ModelCanvas = () => {
  return (
    <div>
      <Canvas id="canvas-container" shadows>
        <Suspense fallback={null}>
          <MainModel />
        </Suspense>
      </Canvas>
    </div>
  );
};
