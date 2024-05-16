import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { useFrame, useThree } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Turbine: THREE.Mesh
    Rotor: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const mesh = useRef<THREE.Group>();
  const group1 = useRef<THREE.Group>();
  const mesh1 = useRef<THREE.Group>();
  const group2 = useRef<THREE.Group>();
  const mesh2 = useRef<THREE.Group>();
  const group3 = useRef<THREE.Group>();
  const mesh3 = useRef<THREE.Group>();
  const group4 = useRef<THREE.Group>();
  const mesh4 = useRef<THREE.Group>();
  const group5 = useRef<THREE.Group>();
  const mesh5 = useRef<THREE.Group>();
  const group6 = useRef<THREE.Group>();
  const mesh6 = useRef<THREE.Group>();
  const group7 = useRef<THREE.Group>();
  const mesh7 = useRef<THREE.Group>();
  const group8 = useRef<THREE.Group>();
  const mesh8 = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(require('../assets/windTurbine.glb')) as GLTFResult;

  const { camera } = useThree();
  // camera.position.z = 0;

  useFrame((_, delta) => {
    if (group.current) {
      mesh.current.rotation.z += 5 * delta;
    }
    if (group1.current) {
      mesh1.current.rotation.z += 2 * delta;
    }
    if (group2.current) {
      mesh2.current.rotation.z += 3 * delta;
    }
    if (group3.current) {
      mesh3.current.rotation.z += 1 * delta;
    }

    if (group4.current) {
      mesh4.current.rotation.z += 1 * delta;
    }

    if (group5.current) {
      mesh5.current.rotation.z += 1 * delta;
    }
    if (group6.current) {
      mesh6.current.rotation.z += 3 * delta;
    }
    if (group7.current) {
      mesh7.current.rotation.z += 0.5 * delta;
    }
    if (group8.current) {
      mesh8.current.rotation.z += 2 * delta;
    }
  });

  return (

    <>
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[0, 10.08, 15.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[1.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      {/* <group ref={group1} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[0, 10.08, 2.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh1}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[1.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group2} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[0, 10.08, 30.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh2}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[1.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group3} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[20, 10.08, 20.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh3}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[2.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group4} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[20, 10.08, 40.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh4}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[2.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group5} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[20, 10.08, 2.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh5}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[2.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group6} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[35, 10.08, 15.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh6}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[2.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group7} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[35, 10.08, 1.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh7}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[2.616, 1.616, 0.972]}
          />
        </mesh>
      </group>
      <group ref={group8} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Turbine.geometry}
          material={nodes.Turbine.material}
          position={[35, 10.08, 30.085]}
          scale={[0.619, 0.619, 1.029]}>
          <mesh
            ref={mesh8}
            castShadow
            receiveShadow
            geometry={nodes.Rotor.geometry}
            material={nodes.Rotor.material}
            position={[0, 0.067, 1.395]}
            scale={[2.616, 1.616, 0.972]}
          />
        </mesh>
      </group> */}
    </>
  );
}
useGLTF.preload('./assets/windTurbine.glb')