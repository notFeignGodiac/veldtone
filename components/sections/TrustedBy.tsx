'use client';
import { trustedBy } from '@/lib/data';
import { useRef } from 'react';

const fontMap: Record<string, string> = {
  playfair: "'Playfair Display', serif",
  courier: "'Courier Prime', monospace",
  cormorant: "'Cormorant Garamond', serif",
};

export default function TrustedBy() {
  const doubled = [...trustedBy, ...trustedBy]; // for infinite scroll

  return (
    <section style={{
      padding: '80px 0',
      background: 'var(--paper)',
      borderTop: '1px solid rgba(160,150,130,0.2)',
      overflow: 'hidden',
    }}>
      {/* Label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        margin: '0 52px 52px',
      }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(154,148,133,0.25)' }} />
        <span style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: 9, letterSpacing: '0.38em',
          textTransform: 'uppercase', color: 'var(--faded)',
          whiteSpace: 'nowrap',
        }}>
          Trusted by creators across every field
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(154,148,133,0.25)' }} />
      </div>

      {/* Scrolling track */}
      <div style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'trustScroll 40s linear infinite',
        }}>
          {doubled.map((co, i) => (
            <div key={i} data-hover style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '0 52px',
              minWidth: 180, gap: 6,
              borderRight: '1px solid rgba(160,150,130,0.12)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.6'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              <span style={{
                fontFamily: fontMap[co.font] || fontMap.playfair,
                fontSize: co.size,
                fontWeight: co.weight,
                color: co.color,
                letterSpacing: co.font === 'courier' ? '0.2em' : '0.04em',
                fontStyle: co.italic ? 'italic' : 'normal',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}>
                {co.name}
              </span>
              <span style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 8, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--faded)',
                whiteSpace: 'nowrap',
              }}>
                {co.field}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes trustScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
