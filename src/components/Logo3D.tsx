
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Logo3D = () => {
  // Références pour les éléments de la marmite
  const potRef = useRef<THREE.Mesh>(null);
  const lidRef = useRef<THREE.Group>(null);
  const steamRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  // Obtenir la caméra
  const { camera } = useThree();
  
  useEffect(() => {
    // Positionner la caméra
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Animation pour chaque frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animation du couvercle
    if (lidRef.current) {
      lidRef.current.position.y = 0.4 + Math.sin(time * 3) * 0.02;
    }
    
    // Animation de la vapeur
    steamRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.y = 1.2 + i * 0.2 + Math.sin(time * 2 + i) * 0.05;
        const material = ref.material as THREE.MeshStandardMaterial;
        if (material.opacity !== undefined) {
          material.opacity = 0.4 - i * 0.1 + Math.sin(time * 2 + i) * 0.1;
        }
      }
    });
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group position={[0, -0.3, 0]} scale={0.8}>
        {/* Corps de la marmite */}
        <mesh ref={potRef} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1.1, 0.8, 32]} />
          <meshStandardMaterial 
            color="#D11B19" 
            roughness={0.3} 
            metalness={0.5}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* Poignées de la marmite */}
        <group position={[0, 0.15, 0]}>
          <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
            <meshStandardMaterial 
              color="#D11B19" 
              roughness={0.3} 
              metalness={0.5} 
            />
          </mesh>
          <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
            <meshStandardMaterial 
              color="#D11B19" 
              roughness={0.3} 
              metalness={0.5} 
            />
          </mesh>
        </group>
        
        {/* Couvercle de la marmite */}
        <group ref={lidRef} position={[0, 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
            <meshStandardMaterial 
              color="#D11B19" 
              roughness={0.3} 
              metalness={0.6} 
            />
          </mesh>
          {/* Bouton du couvercle */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
        
        {/* Vapeur stylisée */}
        {[0, 1, 2].map((i) => (
          <mesh 
            key={i} 
            ref={(ref) => {
              if (ref) steamRefs.current[i] = ref;
            }}
            position={[i === 0 ? 0 : i === 1 ? 0.2 : -0.2, 1.2 + i * 0.2, 0]}
          >
            <sphereGeometry args={[0.2 - i * 0.05, 8, 8]} />
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={0.4 - i * 0.1} 
            />
          </mesh>
        ))}
      </group>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false} 
        minPolarAngle={Math.PI / 2} 
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset="city" />
    </>
  );
};

export default Logo3D;
