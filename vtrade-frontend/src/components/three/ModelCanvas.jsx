import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { MainModel } from "./MainModel";
import "../../assets/styles/canvas.css";
export const ModelCanvas = () => {
  return (
    <div>
      <Canvas id="canvas-container" className="fixed" shadows>
        <Suspense fallback={null}>
          <MainModel />
          <pointLight position={[5, 5, 5]} />
          {/* <Text /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};
