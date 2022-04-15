import React, { useEffect, useRef } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';

function App() {
    const ref = useRef<React.LegacyRef<HTMLDivElement> | null>(null);
    useEffect(() => {
        // Initialize scene
        const scene = new Three.Scene();

        // Initialize camera
        const camera = new Three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 60);
        // Reposition camera
        camera.position.set(6, 0, 0);

        // Initialize renderer
        const renderer = new Three.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        // Set renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Append renderer to body
        // @ts-ignore
        ref?.current?.appendChild(renderer.domElement);

        // Initialize controller
        const controls = new OrbitControls(camera, renderer.domElement);

        // WORLD
        //Load world texture
        const worldTexture = new Three.TextureLoader().load('/world.jpg');
        // Initialize world geometry
        const worldGeometry = new Three.SphereGeometry(1, 40, 40);
        // Initialize world material
        const worldMaterial = new Three.MeshBasicMaterial({
            map: worldTexture,
        });
        // Initialize world
        const world = new Three.Mesh(worldGeometry, worldMaterial);
        // Add earth to scene
        scene.add(world);

        // CLOUDS
        // Load clouds texture
        const cloudTexture = new Three.TextureLoader().load('/clouds.png');
        // Initialize clouds geometry
        const cloudGeometry = new Three.SphereGeometry(1.01, 40, 40);
        // Initialize clouds material
        const cloudMaterial = new Three.MeshBasicMaterial({
            map: cloudTexture,
            transparent: true,
        });
        // Initialize clouds
        const clouds = new Three.Mesh(cloudGeometry, cloudMaterial);
        // Add clouds to scene
        scene.add(clouds);

        // Prepare animation loop
        const animate = () => {
            // request animation frame
            requestAnimationFrame(animate);
            // Rotate world
            world.rotation.y += 0.0005;
            // Rotate clouds
            clouds.rotation.y -= 0.001;
            // Render scene
            renderer.render(scene, camera);
        };

        // Animate
        animate();

        // LListen for window resizeing
        window.addEventListener('resize', () => {
            // Update camera aspect
            camera.aspect = window.innerWidth / window.innerHeight;
            // Update camera projection matrix
            camera.updateProjectionMatrix();
            // I/ Resize renderer
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }, []);

    return (
        <div
            style={{
                background: 'radial-gradient(circle at center, #fff, rgba(113,129,191,0.5) 50%)',
            }}
            // @ts-ignore
            ref={ref}
        />
    );
}

export default App;
