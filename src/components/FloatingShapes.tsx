"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Torus, Sphere, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape({
  children,
  position,
  rotation,
  scale = 1,
  speed = 1,
  floatIntensity = 1,
}: any) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x =
        Math.sin(state.clock.elapsedTime * speed) * 0.2 + rotation[0];
      mesh.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={1}
      floatIntensity={floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={mesh} position={position} scale={scale}>
        {children}
        <meshPhysicalMaterial
          color="#06b6d4" // cyan
          emissive="#8b5cf6" // purple
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#8b5cf6"
        />

        {/* Background stars */}
        <Stars
          radius={50}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Floating Shapes */}
        <AnimatedShape
          position={[-5, 3, -5]}
          rotation={[0.5, 0.2, 0]}
          scale={0.8}
          speed={1.2}
        >
          <Icosahedron args={[1, 0]} />
        </AnimatedShape>

        <AnimatedShape
          position={[6, 4, -8]}
          rotation={[-0.2, 0.5, 0.1]}
          scale={1.2}
          speed={0.8}
        >
          <Torus args={[1, 0.3, 16, 32]} />
        </AnimatedShape>

        <AnimatedShape
          position={[-6, -4, -6]}
          rotation={[0, 0, 0]}
          scale={1.5}
          speed={1}
        >
          <Sphere args={[1, 32, 32]} />
        </AnimatedShape>

        <AnimatedShape
          position={[5, -3, -4]}
          rotation={[0.4, -0.2, 0.5]}
          scale={0.6}
          speed={1.5}
        >
          <Icosahedron args={[1, 0]} />
        </AnimatedShape>
      </Canvas>
    </div>
  );
}
