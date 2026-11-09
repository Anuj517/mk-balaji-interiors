import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader, type Group } from "three";

function BrandScene() {
  const group = useRef<Group>(null);
  const projectTexture = useLoader(TextureLoader, "/images/projects/19.webp");

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.12 - group.current.rotation.y) * delta * 0.5;
    group.current.rotation.x += (-pointer.y * 0.06 - group.current.rotation.x) * delta * 0.5;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.06;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh position={[0.14, 0, -0.3]} rotation={[0, -0.08, 0]}>
        <boxGeometry args={[2.62, 3.4, 0.12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.68} />
      </mesh>
      <mesh position={[0.14, 0, -0.22]} rotation={[0, -0.08, 0]}>
        <planeGeometry args={[2.46, 3.22]} />
        <meshBasicMaterial map={projectTexture} />
      </mesh>
      <mesh position={[-1.42, -0.55, -0.62]} rotation={[0, 0.28, 0.1]}>
        <boxGeometry args={[0.13, 3.8, 0.17]} />
        <meshStandardMaterial color="#B7A89A" roughness={0.7} />
      </mesh>
      <mesh position={[1.58, 0.84, -0.58]} rotation={[0, -0.18, -0.12]}>
        <boxGeometry args={[0.82, 0.09, 0.32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[1.6, -0.87, -0.58]} rotation={[0, -0.18, 0.12]}>
        <boxGeometry args={[0.62, 0.09, 0.32]} />
        <meshStandardMaterial color="#722F37" roughness={0.62} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 36 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={2.2} />
        <directionalLight position={[3, 5, 6]} intensity={1.4} />
        <BrandScene />
      </Canvas>
    </div>
  );
}
