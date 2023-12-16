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
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const MainModel = () => {
  const FloorTexture = useTexture(floorTexture);

  const spotLightRef = useRef(null);
  const orbitControlRef = useRef(null);

  useFrame((state) => {
    if (orbitControlRef.current) {
      const { x, y } = state.mouse;
      // orbitControlRef.current.setAzimuthalAngle((x+1) * degreesToRadians(60));
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
        enableZoom={false}
      />
      <PerspectiveCamera makeDefault position={[-5, 3, -8]} />

      <mesh
        rotation={[
          -degreesToRadians(90),
          degreesToRadians(0),
          degreesToRadians(215),
        ]}
        position={[-5, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[25, 25, 15, 15]} />
        <meshStandardMaterial {...FloorTexture} roughness={0.8} metalness={1} />
      </mesh>
      {/* rotation={[0,degreesToRadians(60),0] */}
      <mesh
        castShadow
        className="hover:cursor-pointer"
        rotation={[0, degreesToRadians(60), 0]}
      >
        <Model scale={0.6} />
      </mesh>

      <ambientLight intensity={1} />
      <hemisphereLight args={["red", "blue"]} />
      {/* <spotLight
        ref={spotLightRef}
        color={"white"}
        position={[0, 2, -0.5]}
        decay={0.1}
        castShadow
      /> */}
      <pointLight position={[0, 4, -0.25]} intensity={1.5} />
      <spotLight
        color={"white"}
        position={[10, 4.2, -0.35]}
        decay={0.1}
        castShadow
      />

      {/* <spotLight
        color={"white"}
        position={[-2, -2.2]}
        decay={0.1}
        castShadow
      /> */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 50, 50]} />
          <meshBasicMaterial color="black" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
};
