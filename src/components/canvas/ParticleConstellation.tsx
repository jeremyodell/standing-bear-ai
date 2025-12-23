"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  anchorX: number;
  anchorY: number;
}

// Bear silhouette anchor points (normalized 0-1 coordinates)
// These define a standing bear shape that particles gravitate toward
const BEAR_ANCHORS = [
  // Head
  { x: 0.5, y: 0.12 },
  { x: 0.44, y: 0.08 },
  { x: 0.56, y: 0.08 },
  { x: 0.42, y: 0.14 },
  { x: 0.58, y: 0.14 },
  // Ears
  { x: 0.38, y: 0.05 },
  { x: 0.62, y: 0.05 },
  // Neck/shoulders
  { x: 0.45, y: 0.2 },
  { x: 0.55, y: 0.2 },
  { x: 0.38, y: 0.25 },
  { x: 0.62, y: 0.25 },
  // Upper body
  { x: 0.35, y: 0.32 },
  { x: 0.65, y: 0.32 },
  { x: 0.5, y: 0.28 },
  // Arms extended slightly
  { x: 0.28, y: 0.35 },
  { x: 0.72, y: 0.35 },
  { x: 0.25, y: 0.42 },
  { x: 0.75, y: 0.42 },
  // Torso
  { x: 0.38, y: 0.45 },
  { x: 0.62, y: 0.45 },
  { x: 0.4, y: 0.55 },
  { x: 0.6, y: 0.55 },
  { x: 0.42, y: 0.65 },
  { x: 0.58, y: 0.65 },
  // Hips
  { x: 0.4, y: 0.72 },
  { x: 0.6, y: 0.72 },
  // Legs
  { x: 0.38, y: 0.8 },
  { x: 0.62, y: 0.8 },
  { x: 0.36, y: 0.88 },
  { x: 0.64, y: 0.88 },
  // Feet
  { x: 0.34, y: 0.95 },
  { x: 0.66, y: 0.95 },
];

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 100;
const ATTRACTION_STRENGTH = 0.0003;
const DRIFT_SPEED = 0.15;

export function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const scaledAnchors = BEAR_ANCHORS.map((a) => ({
      x: a.x * width,
      y: a.y * height,
    }));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Assign each particle to a random anchor point
      const anchor = scaledAnchors[Math.floor(Math.random() * scaledAnchors.length)];

      // Start particles scattered around their anchor with some randomness
      const scatter = Math.min(width, height) * 0.3;

      particles.push({
        x: anchor.x + (Math.random() - 0.5) * scatter,
        y: anchor.y + (Math.random() - 0.5) * scatter,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        anchorX: anchor.x,
        anchorY: anchor.y,
      });
    }

    return particles;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    const particles = particlesRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (!prefersReducedMotion) {
        // Apply gentle attraction toward anchor point
        const dx = p.anchorX - p.x;
        const dy = p.anchorY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          p.vx += (dx / distance) * ATTRACTION_STRENGTH * distance;
          p.vy += (dy / distance) * ATTRACTION_STRENGTH * distance;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Add subtle random drift
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        // Keep particles in bounds
        if (p.x < 0 || p.x > width) p.vx *= -0.5;
        if (p.y < 0 || p.y > height) p.vy *= -0.5;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
      ctx.fill();
    }

    // Draw connections between nearby particles
    ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.15;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    if (!prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Reinitialize particles on resize
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    // Initial setup
    resizeCanvas();

    // Handle resize
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    // Start animation
    animate();

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
