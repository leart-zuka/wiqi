'use client'

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
    const model = useLoader(GLTFLoader, '/models/atom.glb');
    console.log('Model loaded:', model); 
    return <primitive object={model.scene} position={[0, 0, 0]} scale={1} />;
};

const Scene3D = () => {
    return (
        <div style={{ 
            width: "300px",
            height: "300px",
            background: 'transparent'
        }}>
            <Canvas
                camera={{ position: [0, 0, 5] }}
            >
                <Suspense fallback={null}>
                    <Model />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls 
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D; 