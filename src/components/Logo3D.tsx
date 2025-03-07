import { useRef, useEffect, FC, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  scale?: number;
  color?: string;
  steamOpacity?: number;
}

// Constantes pour les matériaux et les animations
const MATERIALS = {
  POT: {
    color: '#D11B19',
    roughness: 0.3,
    metalness: 0.5,
    envMapIntensity: 1
  },
  HANDLE: {
    color: '#D11B19',
    roughness: 0.3,
    metalness: 0.5
  },
  LID: {
    color: '#D11B19',
    roughness: 0.3,
    metalness: 0.6
  },
  BUTTON: {
    color: '#000000'
  }
};

const ANIMATION = {
  LID: {
    frequency: 3,
    amplitude: 0.02,
    baseHeight: 0.4
  },
  STEAM: {
    frequency: 2,
    amplitude: 0.05,
    baseHeight: 1.2,
    spacing: 0.2,
    baseOpacity: 0.4,
    opacityDecrement: 0.1
  }
};

const Logo3D: FC<Logo3DProps> = ({ 
  scale = 0.8, 
  color = MATERIALS.POT.color,
  steamOpacity = ANIMATION.STEAM.baseOpacity 
}) => {
  const potRef = useRef<THREE.Mesh>(null);
  const lidRef = useRef<THREE.Group>(null);
  const steamRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const { camera } = useThree();
  
  // Matériaux mémorisés
  const materials = useMemo(() => ({
    pot: new THREE.MeshStandardMaterial({ 
      ...MATERIALS.POT,
      color 
    }),
    handle: new THREE.MeshStandardMaterial({ 
      ...MATERIALS.HANDLE,
      color 
    }),
    lid: new THREE.MeshStandardMaterial({ 
      ...MATERIALS.LID,
      color 
    }),
    button: new THREE.MeshStandardMaterial(MATERIALS.BUTTON)
  }), [color]);
  
  useEffect(() => {
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (lidRef.current) {
      lidRef.current.position.y = ANIMATION.LID.baseHeight + 
        Math.sin(time * ANIMATION.LID.frequency) * ANIMATION.LID.amplitude;
    }
    
    steamRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.y = ANIMATION.STEAM.baseHeight + 
          i * ANIMATION.STEAM.spacing + 
          Math.sin(time * ANIMATION.STEAM.frequency + i) * ANIMATION.STEAM.amplitude;
          
        const material = ref.material as THREE.MeshStandardMaterial;
        if (material.opacity !== undefined) {
          material.opacity = steamOpacity - 
            i * ANIMATION.STEAM.opacityDecrement + 
            Math.sin(time * ANIMATION.STEAM.frequency + i) * ANIMATION.STEAM.opacityDecrement;
        }
      }
    });
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group position={[0, -0.3, 0]} scale={scale}>
        <mesh ref={potRef} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1.1, 0.8, 32]} />
          <primitive object={materials.pot} />
        </mesh>
        
        <group position={[0, 0.15, 0]}>
          {[-1.2, 1.2].map((x) => (
            <mesh 
              key={x} 
              position={[x, 0, 0]} 
              rotation={[0, 0, Math.PI / 2]}
            >
              <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
              <primitive object={materials.handle} />
            </mesh>
          ))}
        </group>
        
        <group ref={lidRef} position={[0, ANIMATION.LID.baseHeight, 0]}>
          <mesh>
            <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
            <primitive object={materials.lid} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
            <primitive object={materials.button} />
          </mesh>
        </group>
        
        {[0, 1, 2].map((i) => (
          <mesh 
            key={i} 
            ref={(ref) => {
              if (ref) steamRefs.current[i] = ref;
            }}
            position={[
              i === 0 ? 0 : i === 1 ? 0.2 : -0.2, 
              ANIMATION.STEAM.baseHeight + i * ANIMATION.STEAM.spacing, 
              0
            ]}
          >
            <sphereGeometry args={[0.2 - i * 0.05, 8, 8]} />
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={steamOpacity - i * ANIMATION.STEAM.opacityDecrement} 
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
