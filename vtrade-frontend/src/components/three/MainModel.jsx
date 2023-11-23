import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import degreesToRadians from "../../utils/functions.jsx";
import { floorTexture } from "../../utils/texture_floor.jsx";
import { Model } from "../../assets/models/Model.jsx";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const MainModel = () => {
  const FloorTexture = useTexture(floorTexture);

  const spotLightRef = useRef(null);
  const orbitControlRef = useRef(null);

  useFrame((state) => {
    if (orbitControlRef.current) {
      const { x, y } = state.mouse;
      // orbitControlRef.current.setAzimuthalAngle((x+1) * degreesToRadians(1));
      orbitControlRef.current.setPolarAngle(
        (y + 1) * degreesToRadians(90 - 50)
      );
      orbitControlRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls
        ref={orbitControlRef}
        minPolarAngle={degreesToRadians(77)}
        maxPolarAngle={degreesToRadians(83)}
      />
      <PerspectiveCamera makeDefault position={[-5, 3, -8]} />

      <mesh
        rotation={[-degreesToRadians(90), degreesToRadians(0), degreesToRadians(215)]}
        position={[-5, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100, 30, 30]} />
        <meshStandardMaterial {...FloorTexture} roughness={0.8} metalness={1} />
      </mesh>
      {/* rotation={[0,degreesToRadians(60),0] */}
      <mesh castShadow rotation={[0,degreesToRadians(80),0]}>
        {/* <Model scale={0.6} /> */}
      </mesh>

      <ambientLight intensity={0.1} color={"white"} />
      <hemisphereLight />
      <spotLight
        ref={spotLightRef}
        color={"white"}
        position={[0, 2, -0.5]}
        decay={0.5}
        castShadow
      />
      <spotLight
        color={"white"}
        position={[0.35, 2.2, -0.35]}
        decay={0.5}
        castShadow
      />
       <spotLight
        color={"white"}
        position={[0, 2, -2.2]}
        decay={0.5}
        castShadow
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 50, 50]} />
          <meshBasicMaterial color="black" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
};
