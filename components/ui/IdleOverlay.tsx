'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdleOverlay() {
  const [idle, setIdle] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_MS = 3500;

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (idle) return; // don't reset if already showing
    timerRef.current = setTimeout(() => setIdle(true), IDLE_MS);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    const onActivity = (e: Event) => {
      // allow typing to not trigger
      if (e.type === 'keydown') return;
      resetTimer();
    };
    events.forEach(ev => window.addEventListener(ev, onActivity, { passive: true }));
    resetTimer();
    return () => {
      events.forEach(ev => window.removeEventListener(ev, onActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idle]);

  return (
    <AnimatePresence>
      {idle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => { setIdle(false); resetTimer(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            background: 'rgba(28,31,24,0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* Animated concentric rings */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {[1,2,3,4].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0, 0.12, 0] }}
                transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: i * 180, height: i * 180,
                  border: '1px solid var(--sage)',
                  borderRadius: '50%',
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(52px, 8vw, 100px)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'var(--cream)',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}>
              VELDTONE
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              fontStyle: 'italic',
              color: 'var(--sage)',
              marginTop: 12,
              letterSpacing: '0.06em',
            }}>
              The land remembers every sound it ever made.
            </div>
          </motion.div>

          {/* Waveform animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 2, height: 40, position: 'relative', zIndex: 2 }}
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.6 + Math.random() * 1.2,
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: 2,
                  height: 4 + Math.random() * 28,
                  background: 'var(--sage)',
                  borderRadius: 1,
                  opacity: 0.5,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </motion.div>

          {/* Dismiss hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 1.2, duration: 2.4, repeat: Infinity }}
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: 9, letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              position: 'relative', zIndex: 2,
            }}
          >
            ◎ Click anywhere to continue
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
