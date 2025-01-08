import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function RotatingBrain({ children }: { children: React.ReactNode}) {
  const groupRef = React.useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.001;
    }
  });

  return <group ref={groupRef}>{children}</group>
}