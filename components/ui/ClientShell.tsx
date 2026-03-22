'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Cursor from './Cursor';
import Nav from './Nav';
import IdleOverlay from './IdleOverlay';
import DemoPlayer from './DemoPlayer';

interface ClientShellProps {
  children: React.ReactNode;
}

// Context for demo player
import { createContext, useContext } from 'react';
interface DemoCtx { openDemo: (id: number) => void; }
export const DemoContext = createContext<DemoCtx>({ openDemo: () => {} });
export const useDemo = () => useContext(DemoContext);

export default function ClientShell({ children }: ClientShellProps) {
  const [demoId, setDemoId] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <DemoContext.Provider value={{ openDemo: setDemoId }}>
      <Cursor />
      <IdleOverlay />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <DemoPlayer trackId={demoId} onClose={() => setDemoId(null)} />

      {/* Footer */}
      <footer style={{
        background: 'var(--forest)',
        padding: '80px 52px 40px',
        borderTop: '3px solid #4A6741',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 60,
          marginBottom: 60,
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: 'var(--cream)', letterSpacing: '0.04em', marginBottom: 8 }}>VELDTONE</div>
            <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 16 }}>African Atmospheric Field Recordings</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(250,246,238,0.55)', lineHeight: 1.7, maxWidth: 280 }}>
              Capturing what the veld sounds like before it's gone. Founded 2018. Based in the field — administratively in Cape Town.
            </p>
          </div>
          {[
            { title: 'Catalogue', items: ['Weather & Atmosphere', 'Wildlife & Ecology', 'Acoustic Spaces', 'Water & Hydrology', 'Human Absence'] },
            { title: 'Licensing', items: ['Field Licence', 'Studio Licence', 'Archive / Enterprise', 'Custom Commissions', 'Exclusivity Windows'] },
            { title: 'Contact', items: ['hello@veldtone.co.za', '+27 21 448 7203', 'Cape Town, ZA', 'Seasons: Jan–May, Aug–Nov'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Courier Prime',monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(143,168,130,0.2)' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.items.map(item => (
                  <li key={item} style={{ fontFamily: "'Courier Prime',monospace", fontSize: 10, letterSpacing: '0.08em', color: 'rgba(250,246,238,0.5)', padding: '6px 0', lineHeight: 1.5 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid rgba(143,168,130,0.2)',
          paddingTop: 28,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontFamily: "'Courier Prime',monospace", fontSize: 9, letterSpacing: '0.12em', color: 'rgba(250,246,238,0.3)' }}>
            © 2026 VELDTONE (PTY) LTD — All environmental recordings, all rights reserved
          </p>
          <p style={{ fontFamily: "'Courier Prime',monospace", fontSize: 9, letterSpacing: '0.18em', color: 'var(--sage)', opacity: 0.7 }}>
            Created for you by FEIGN
          </p>
          <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: 9, letterSpacing: '0.1em', color: 'rgba(143,168,130,0.5)' }}>
            33°55′S 18°22′E — and everywhere beyond
          </div>
        </div>
      </footer>
    </DemoContext.Provider>
  );
}
