'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let rx = 0, ry = 0;

  useEffect(() => {
    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const big = t.matches('a,button,input,textarea,select,[data-hover]');
      if (ringRef.current) {
        ringRef.current.style.width  = big ? '52px' : '32px';
        ringRef.current.style.height = big ? '52px' : '32px';
        ringRef.current.style.opacity = big ? '0.8' : '0.4';
        ringRef.current.style.borderRadius = big ? '0' : '50%';
      }
    };

    let raf: number;
    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        width: 8, height: 8,
        background: 'var(--forest)',
        borderRadius: '50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 99999,
        mixBlendMode: 'multiply',
        transition: 'transform 0.08s',
      }} />
      <div ref={ringRef} style={{
        width: 32, height: 32,
        border: '1px solid var(--forest)',
        borderRadius: '50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 99998,
        opacity: 0.4,
        mixBlendMode: 'multiply',
        transition: 'width 0.2s, height 0.2s, opacity 0.2s, border-radius 0.2s',
      }} />
    </>
  );
}
