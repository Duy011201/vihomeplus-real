import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
            color="#14b8a6" // Brand color 500
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.1}
        />
        </Sphere>
    </Float>
  );
};

const ThreeHero: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-30 pointer-events-none z-0">
      <Canvas>
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default ThreeHero;