"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Lazy load Canvas to reduce initial bundle size
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-transparent" />
});

type ShapeType = "diamond" | "sphere" | "torusKnot" | "heart" | "icosahedron";

function HeartShape({ color }: { color: string }) {
    const heartShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0.5);
        shape.bezierCurveTo(0, 0.5, -0.5, 1, -1, 0.5);
        shape.bezierCurveTo(-1.5, 0, -1, -0.7, 0, -1.2);
        shape.bezierCurveTo(1, -0.7, 1.5, 0, 1, 0.5);
        shape.bezierCurveTo(0.5, 1, 0, 0.5, 0, 0.5);
        return shape;
    }, []);

    const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };

    return (
        <mesh scale={0.08}>
            <extrudeGeometry args={[heartShape, extrudeSettings]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
    );
}

function FloatingShape({ position, color, speed, type }: { position: [number, number, number]; color: string; speed: number; type: ShapeType }) {
    const groupRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        // Gentle floating motion
        groupRef.current.position.y += Math.sin(time * speed) * 0.002;

        // Warm flickering/pulsing effect
        if (lightRef.current) {
            lightRef.current.intensity = 2.5 + Math.sin(time * 10) * 0.6 + (Math.random() * 0.4);
        }
    });

    const renderGeometry = () => {
        // Lower segments for mobile/performance
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

        switch (type) {
            case "diamond":
                return (
                    <mesh>
                        <octahedronGeometry args={[0.22, 0]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={8} transparent opacity={0.9} />
                    </mesh>
                );
            case "sphere":
                return (
                    <mesh>
                        <sphereGeometry args={[0.18, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} transparent opacity={0.9} />
                    </mesh>
                );
            case "torusKnot":
                return (
                    <mesh>
                        <torusKnotGeometry args={[0.15, 0.04, isMobile ? 32 : 64, isMobile ? 4 : 8]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} transparent opacity={0.9} />
                    </mesh>
                );
            case "heart":
                return <HeartShape color={color} />;
            case "icosahedron":
                return (
                    <mesh>
                        <icosahedronGeometry args={[0.2, 0]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={8} transparent opacity={0.9} />
                    </mesh>
                );
            default:
                return null;
        }
    };

    return (
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
            <group ref={groupRef} position={position}>
                {renderGeometry()}
                <pointLight ref={lightRef} color={color} intensity={2.5} distance={5} decay={2} />
            </group>
        </Float>
    );
}

function Ambience({ type }: { type: ShapeType }) {
    const shapes = useMemo(() => {
        // Reduce count slightly for better cross-device stability
        return Array.from({ length: 24 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 6,
            ] as [number, number, number],
            color: type === "diamond" || type === "icosahedron" ? (i % 2 === 0 ? "#F9D648" : "#FFD700") :
                type === "sphere" ? "#f59e0b" :
                    type === "torusKnot" ? "#10b981" :
                        "#fb7185", // Pinkish for heart
            speed: 0.15 + Math.random() * 0.35,
        }));
    }, [type]);

    return (
        <>
            <ambientLight intensity={0.6} />
            {shapes.map((props, i) => (
                <FloatingShape key={i} {...props} type={type} />
            ))}
        </>
    );
}

export default function ImmersiveBackground() {
    const prefersReducedMotion = useReducedMotion();
    const pathname = usePathname();

    const shapeType: ShapeType = useMemo(() => {
        if (!pathname) return "diamond";
        if (pathname === "/" || pathname === "") return "diamond";
        if (pathname.includes("nikkah")) return "diamond";
        if (pathname.includes("holud")) return "sphere";
        if (pathname.includes("mehndi")) return "torusKnot";
        if (pathname.includes("biye")) return "heart";
        if (pathname.includes("reception")) return "icosahedron";
        return "diamond";
    }, [pathname]);

    if (prefersReducedMotion) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-100">
            <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
                <Ambience type={shapeType} />
            </Canvas>
        </div>
    );
}
