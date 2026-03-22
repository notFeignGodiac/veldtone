'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading'|'reveal'>('loading');

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('vt_loaded')) { setVisible(false); return; }

    const steps = [12, 28, 41, 57, 73, 88, 100];
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(iv);
        setPhase('reveal');
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem('vt_loaded', '1');
        }, 900);
      }
    }, 280);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99990,
            background: 'var(--forest)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 40,
          }}
        >
          {/* Topo lines bg */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} viewBox="0 0 800 600">
            {[80,140,200,260,320,380].map((r, i) => (
              <ellipse key={i} cx="400" cy="300" rx={r} ry={r * 0.7} fill="none" stroke="white" strokeWidth="0.8" />
            ))}
          </svg>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              color: 'var(--cream)',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}>
              VELDTONE
            </div>
            <div style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: 10,
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginTop: 12,
            }}>
              African Atmospheric Field Recordings
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ width: 240, position: 'relative', zIndex: 2 }}
          >
            <div style={{ height: 1, background: 'rgba(143,168,130,0.2)', position: 'relative' }}>
              <motion.div
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  background: 'var(--sage)',
                  width: `${progress}%`,
                  transition: 'width 0.25s ease',
                }}
              />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: 10,
              fontFamily: "'Courier Prime', monospace",
              fontSize: 9, letterSpacing: '0.2em',
              color: 'rgba(143,168,130,0.6)',
              textTransform: 'uppercase',
            }}>
              <span>Loading archive</span>
              <span>{progress}%</span>
            </div>
          </motion.div>

          {/* Phase label */}
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.5, y: 0 }}
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: 9, letterSpacing: '0.25em',
              color: 'var(--sage)',
              textTransform: 'uppercase',
              position: 'relative', zIndex: 2,
            }}
          >
            {phase === 'loading' ? '◉ Calibrating field recordings' : '◎ Ready — entering the veld'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
