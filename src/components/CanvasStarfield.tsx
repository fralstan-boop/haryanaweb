"use client";

import React, { useEffect, useRef } from 'react';

export default function CanvasStarfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number, y: number, radius: number, alpha: number, twinkleSpeed: number }[] = [];
        let resizeObserver: ResizeObserver;

        const initStars = () => {
            stars = [];
            // Optimized star density
            const numStars = Math.floor((canvas.width * canvas.height) / 4000); 
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.3, // Size variations
                    alpha: Math.random(),
                    twinkleSpeed: (Math.random() * 0.015) + 0.005
                });
            }
        };

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                initStars();
            }
        };

        resizeObserver = new ResizeObserver(() => {
            resize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.alpha += star.twinkleSpeed;
                if (star.alpha > 1) {
                    star.alpha = 1;
                    star.twinkleSpeed = -star.twinkleSpeed;
                } else if (star.alpha < 0.1) {
                    star.alpha = 0.1;
                    star.twinkleSpeed = Math.abs(star.twinkleSpeed);
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw simple soft glow (much faster than shadowBlur)
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.15})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 pointer-events-none" 
            style={{ width: '100%', height: '100%', opacity: 0.9 }}
        />
    );
}
