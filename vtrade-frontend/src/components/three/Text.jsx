import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Font from "../../assets/fonts/Font.json";
import degreesToRadians from "../../utils/functions";
extend({ TextGeometry });
export default function Text() {
  const font = new FontLoader().parse(Font);
  const textOptions = {
    font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  };
  return (
    <mesh position={[0, 2, 0]} rotation={[0, degreesToRadians(-180),0]}>
      <textGeometry args={["VTrade", textOptions]} />
      <meshPhysicalMaterial attach="material" color={"white"} />
    </mesh>
  );
}
