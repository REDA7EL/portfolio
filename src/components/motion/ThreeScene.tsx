"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// 1. The Stable Background Sphere (Original)
function BackgroundSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.5, 3), []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotate slowly and independently
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={0.3}
          wireframe={true}
          transparent
          opacity={0.1}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

// 2. The Interactive AI Ghost (Tracks Mouse)
function AIGhost() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !ring1Ref.current || !ring2Ref.current) return;
    
    // 1. Move ghost — subtle range so it stays visible in the hero area
    const targetPosX = THREE.MathUtils.clamp(mouse.current.x * 2, -3, 3);
    const targetPosY = THREE.MathUtils.clamp(mouse.current.y * 1.5, -1.5, 1.5);
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.025);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.025);
    
    // 2. Tilt/lean towards movement direction
    const velocityX = targetPosX - groupRef.current.position.x;
    const velocityY = targetPosY - groupRef.current.position.y;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -velocityX * 0.1, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, velocityY * 0.1, 0.04);
    
    // 3. Look towards cursor (face direction)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.4, 0.03);
    
    // 4. Ghostly idle animations
    const t = state.clock.getElapsedTime();
    coreRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.03);
    
    ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    ring1Ref.current.rotation.y += delta * 0.3;
    
    ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.4;
    ring2Ref.current.rotation.y -= delta * 0.5;
  });

  return (
    <group ref={groupRef} position={[0, 0, 2]} scale={0.6}>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1}>
        
        {/* Spectral Core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 4]} />
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#4c1d95"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.2}
            transmission={0.9}
            thickness={1.5}
            clearcoat={1}
            transparent
            opacity={0.85}
          />
        </mesh>
        
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>

        {/* Ethereal Visor */}
        <mesh position={[0, 0.2, 0.95]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.06, 0.6, 8, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0.2, 1.0]} rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Wispy Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.8, 0.015, 16, 100]} />
          <meshPhysicalMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} transparent opacity={0.7} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.01, 16, 100]} />
          <meshPhysicalMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} transparent opacity={0.5} wireframe />
        </mesh>
        
      </Float>
    </group>
  );
}

export function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
        
        {/* Render both components independently */}
        <BackgroundSphere />
        <AIGhost />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
