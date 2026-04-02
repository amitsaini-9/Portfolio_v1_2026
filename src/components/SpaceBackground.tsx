"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a sphere
function generateSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;

    const sinPhi = Math.sin(phi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function StarParticleSystem() {
  const ref = useRef<THREE.Points>(null!);

  // 5000 stars in a radius of 15
  const sphere = useMemo(() => generateSpherePoints(5000, 15), []);

  // Slowly rotate the entire starfield for a drifting cosmos effect
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#88ccff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Larger wireframe geometries simulating distant space nebulas / ring structures
function FloatingNebula({ position, color, speed, scale }: any) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#030305]">
      {/* GPU Accelerated R3F Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        {/* Deep spatial lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          color="#4ade80"
        />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={1}
          color="#a855f7"
        />

        <StarParticleSystem />

        {/* Deep background geometric "nebulas" */}
        <FloatingNebula
          position={[-4, 2, -10]}
          color="#22d3ee"
          speed={0.2}
          scale={3}
        />
        <FloatingNebula
          position={[5, -3, -15]}
          color="#a855f7"
          speed={0.15}
          scale={4}
        />
        <FloatingNebula
          position={[-6, -5, -20]}
          color="#3b82f6"
          speed={0.1}
          scale={5}
        />
      </Canvas>

      {/* Global CSS Noise Overlay to tie it into the glassmorphic UI aesthetic */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay border-none pointer-events-none" />
    </div>
  );
}
