'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { tracks } from '@/lib/data';
import { useDemo } from '@/components/ui/ClientShell';

const FILTERS = ['All','Weather','Wildlife','Acoustic'];
const PF = { fontFamily:"'Playfair Display',serif" };
const S  = { fontFamily:"'Courier Prime',monospace" };
const CG = { fontFamily:"'Cormorant Garamond',serif" };

export default function Catalogue() {
  const { openDemo } = useDemo();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? tracks : tracks.filter(t => t.category === filter);

  return (
    <main style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--bone)' }}>
      {/* Header */}
      <div style={{ padding: '60px 52px 0', background: 'var(--cream)', borderBottom: '1px solid var(--paper)' }}>
        <div style={{ ...S, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>◎</span> Sound Archive
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 40 }}>
          <h1 style={{ ...PF, fontSize: 'clamp(48px,6vw,88px)', fontWeight: 900, color: 'var(--ink)', lineHeight: 0.95 }}>
            The<br /><em style={{ color: 'var(--forest)', fontWeight: 400 }}>recordings</em>
          </h1>
          <div style={{ display: 'flex', gap: 2 }}>
            {FILTERS.map(f => (
              <button key={f} data-hover onClick={() => setFilter(f)} style={{
                ...S, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '10px 20px', border: '1px solid',
                borderColor: filter === f ? 'var(--forest)' : 'var(--paper)',
                background: filter === f ? 'var(--forest)' : 'transparent',
                color: filter === f ? 'var(--cream)' : 'var(--faded)',
                transition: 'all 0.2s',
              }}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '2px 52px 80px', background: 'var(--bone)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--paper)', border: '1px solid var(--paper)', marginTop: 40 }}>
          {filtered.map((track, i) => (
            <motion.div key={track.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              data-hover onClick={() => openDemo(track.id)}
              style={{ background: 'var(--cream)', padding: '32px 28px', position: 'relative', overflow: 'hidden', transition: 'background 0.25s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bone)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--cream)'}
            >
              {/* Bottom border hover */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'transparent', transition: 'background 0.4s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--forest)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, ...S, fontSize: 9, letterSpacing: '0.2em', color: 'var(--faded)' }}>
                <span>{track.num}</span>
                <span style={{ background: track.tagColor === 'forest' ? 'var(--forest)' : track.tagColor === 'faded' ? 'var(--faded)' : 'var(--rust)', color: 'var(--cream)', fontSize: 7, letterSpacing: '0.25em', padding: '3px 9px' }}>{track.tag}</span>
              </div>

              {/* Mini waveform */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 1, height: 24, marginBottom: 20, opacity: 0.35 }}>
                {track.freqProfile.map((h, j) => (
                  <div key={j} style={{ flex: 1, height: `${h * 100}%`, background: 'var(--forest)', borderRadius: 1 }} />
                ))}
              </div>

              <div style={{ ...PF, fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.15 }}>{track.title}</div>
              <div style={{ ...S, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--faded)', marginBottom: 16 }}>◎ {track.location}</div>
              <p style={{ ...CG, fontSize: 15, fontStyle: 'italic', lineHeight: 1.65, color: 'var(--faded)', marginBottom: 28 }}>{track.desc}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--paper)' }}>
                <div style={{ ...PF, fontSize: 20, fontWeight: 700, color: 'var(--forest)' }}>
                  R{track.price} <span style={{ fontSize: 10, ...S, color: 'var(--faded)', fontWeight: 400 }}>/ licence</span>
                </div>
                <div style={{ ...S, fontSize: 9, color: 'var(--faded)' }}>{track.duration} · {track.format.split('/')[0].trim()}</div>
              </div>
              <div style={{ ...S, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', marginTop: 10, opacity: 0.7, display: 'flex', alignItems: 'center', gap: 6 }}>▶ Click to preview demo</div>
            </motion.div>
          ))}
        </div>

        {/* Licensing note */}
        <div style={{ marginTop: 48, padding: '32px 36px', background: 'var(--cream)', border: '1px solid var(--paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ ...S, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--faded)', marginBottom: 8 }}>Need the full archive?</div>
            <div style={{ ...PF, fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>340+ recordings. Custom commissions available.</div>
          </div>
          <a href="/contact" style={{ ...S, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream)', background: 'var(--forest)', padding: '14px 32px', textDecoration: 'none' }}>Contact for Archive Access</a>
        </div>
      </div>
    </main>
  );
}
