import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Factor } from './factorSlider/FactorSlider';
import { CUBE_FACE_COLORS } from '@/constants';

interface Cube3DProps {
  factors: Factor[];
}

const GRID_SIZE = 5;

const FACE_LABELS = [
  'Governance & Accountability',
  'Ethics & Responsible AI',
  'Data Integrity & Security',
  'Model Quality & Technical Rigor',
  'Operationalization & Lifecycle Management',
  'Stakeholder & Societal Impact'
];

// const faceOffsets = [
//   [0, 0, 1],   // front
//   [0, 0, -1],  // back
//   [0, 1, 0],   // top
//   [0, -1, 0],  // bottom
//   [1, 0, 0],   // right
//   [-1, 0, 0],  // left
// ];

const Cube3D: React.FC<Cube3DProps> = ({ factors }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const [rotationX, setRotationX] = useState(0.5);
  const [rotationY, setRotationY] = useState(0.5);

  useEffect(() => {
    const currentMount = mountRef.current;
    const width = 450;
    const height = 450;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    if (currentMount) {
      currentMount.appendChild(renderer.domElement);
    }

    const limitedFactors = factors.slice(0, 6);
    while (limitedFactors.length < 6) {
      limitedFactors.push({ name: '', score: 0, weight: 1 });
    }

    function createRubikFace(color: string, score: number, label?: string) {
      const size = 256;
      const grid = GRID_SIZE;
      const cell = size / grid;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      let filled = 0;
      for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
          if (filled < score) {
            ctx.fillStyle = color;
          } else {
            ctx.fillStyle = 'rgba(0,0,0,0)';
          }
          ctx.fillRect(j * cell + 6, i * cell + 6, cell - 12, cell - 12);
          ctx.strokeRect(j * cell + 6, i * cell + 6, cell - 12, cell - 12);
          filled++;
        }
      }
      // Draw watermark label if provided
      if (label) {
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Word wrap: split label into lines that fit within 200px
        const maxWidth = 200;
        const words = label.split(' ');
        const lines = [];
        let line = '';
        for (let i = 0; i < words.length; i++) {
          const testLine = line ? line + ' ' + words[i] : words[i];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && line) {
            lines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }
        if (line) lines.push(line);
        
        // ELITE TEXT ORIENTATION: Determine if text should be flipped based on rotation
        const currentRotX = rotationX * Math.PI * 2;
        const currentRotY = rotationY * Math.PI * 2;
        
        // Normalize rotations to 0-2π range
        const normalizedRotX = ((currentRotX % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const normalizedRotY = ((currentRotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        
        // Flip text if cube is rotated in a way that would make text upside down
        const shouldFlip = (normalizedRotX > Math.PI/2 && normalizedRotX < 3*Math.PI/2);
        
        if (shouldFlip) {
          ctx.translate(size / 2, size / 2);
          ctx.rotate(Math.PI); // 180 degree rotation
          ctx.translate(-size / 2, -size / 2);
        }
        
        // Draw each line, centered vertically
        const lineHeight = 18;
        const totalHeight = lineHeight * lines.length;
        for (let i = 0; i < lines.length; i++) {
          const y = size / 2 - totalHeight / 2 + i * lineHeight + lineHeight / 2;
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#000';
          ctx.fillStyle = '#fff';
          ctx.strokeText(lines[i], size / 2, y);
          ctx.lineWidth = 1.5;
          ctx.strokeText(lines[i], size / 2, y); // double stroke for bolder outline
          ctx.fillText(lines[i], size / 2, y);
        }
        ctx.restore();
      }
      return new THREE.CanvasTexture(canvas);
    }

    const materials: THREE.Material[] = [];
    for (let f = 0; f < 6; f++) {
      const factor = limitedFactors[f];
      const score = Math.max(0, Math.min(25, Math.round(factor.score)));
      const faceColor = CUBE_FACE_COLORS[f];
      materials.push(
        new THREE.MeshBasicMaterial({
          map: createRubikFace(faceColor, score, FACE_LABELS[f]),
          transparent: true,
        })
      );
    }
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, materials);
    cubeRef.current = cube;
    scene.add(cube);
    camera.position.z = 3.5;

    // Animation loop (no auto-spin)
    let frameId: number;
    const animate = () => {
      cube.rotation.x = rotationX * Math.PI * 2;
      cube.rotation.y = rotationY * Math.PI * 2;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Clean up
    return () => {
      renderer.dispose();
      if (frameId) cancelAnimationFrame(frameId);
      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [factors, rotationX, rotationY]);

  // Handlers for sliders
  const handleHorizontal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotationY(Number(e.target.value));
  };
  const handleVertical = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotationX(Number(e.target.value));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: 470 }}>
      {/* 
        PRECISE CENTERING CALCULATION:
        - Vertical slider visual width: 20px (height after 270° rotation)
        - Margin between cube and slider: 16px  
        - Total right-side offset: 36px
        - Perfect centering: 18px left margin (36px / 2)
      */}
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '450px' }}>
        {/* Main cube container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div ref={mountRef} style={{ width: 450, height: 450, background: 'transparent', borderRadius: 8 }} />
          {/* Horizontal slider below */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={rotationY}
            onChange={handleHorizontal}
            style={{ width: 450, marginTop: 8 }}
          />
        </div>
        
        {/* Vertical slider on the right */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={rotationX}
          onChange={handleVertical}
          style={{ width: 450, height: 20, marginLeft: 16, transform: 'rotate(270deg)' }}
        />
      </div>
    </div>
  );
};

export default Cube3D;
