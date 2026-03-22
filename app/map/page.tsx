'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { mapLocations } from '@/lib/data';

const LeafletMap = dynamic(() => import('@/components/map/LeafletMap'), { ssr: false, loading: () => (
  <div style={{ width:'100%', height:'60vh', minHeight:480, background:'var(--forest)', display:'flex', alignItems:'center', justifyContent:'center' }}>
    <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(143,168,130,0.6)' }}>◉ Loading terrain...</div>
  </div>
)});

const PF = { fontFamily:"'Playfair Display',serif" };
const S  = { fontFamily:"'Courier Prime',monospace" };
const CG = { fontFamily:"'Cormorant Garamond',serif" };

export default function MapPage() {
  return (
    <main style={{ paddingTop: 88, minHeight: '100vh', background: 'var(--forest)' }}>

      {/* Header */}
      <div style={{ padding: '60px 52px 40px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ ...S, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 1, background: 'var(--sage)', display: 'inline-block' }} /> Recording Locations
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h1 style={{ ...PF, fontSize: 'clamp(48px,6vw,88px)', fontWeight: 900, color: 'var(--cream)', lineHeight: 0.95 }}>
              Where we've<br /><em style={{ fontWeight: 300, color: 'var(--sage)' }}>been</em>
            </h1>
            <p style={{ ...S, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', maxWidth: 240, textAlign: 'right', lineHeight: 1.7 }}>
              Click any pin to see what was recorded there. Drag to explore. Scroll to zoom.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ border: '1px solid rgba(143,168,130,0.15)', margin: '0 52px', position: 'relative', zIndex: 2 }}>
        <LeafletMap />
        {/* Legend */}
        <div style={{ display: 'flex', gap: 28, padding: '14px 24px', background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(143,168,130,0.1)' }}>
          {[['var(--rust)','Existing recording'],['var(--sage)','New this season']].map(([color,label])=>(
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, ...S, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, border: '1px solid var(--cream)', flexShrink: 0 }} />{label}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', ...S, fontSize: 8, letterSpacing: '0.15em', color: 'rgba(143,168,130,0.5)' }}>© OpenStreetMap contributors</div>
        </div>
      </motion.div>

      {/* Location list */}
      <div style={{ padding: '60px 52px 100px' }}>
        <div style={{ ...S, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(143,168,130,0.6)', marginBottom: 32 }}>All recorded locations</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
          {mapLocations.map((loc, i) => (
            <motion.div key={loc.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
              data-hover
              style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 32, padding: '22px 28px', background: 'rgba(0,0,0,0.2)', transition: 'background 0.2s', alignItems: 'center', borderLeft: '2px solid transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.35)'; (e.currentTarget as HTMLElement).style.borderLeftColor = loc.isNew ? 'var(--sage)' : 'var(--rust)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.2)'; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}
            >
              <div style={{ ...S, fontSize: 9, letterSpacing: '0.2em', color: 'var(--sage)', opacity: 0.7 }}>#{String(loc.id).padStart(2,'0')}</div>
              <div>
                <div style={{ ...PF, fontSize: 18, fontWeight: 700, color: 'var(--cream)', marginBottom: 4 }}>{loc.title}</div>
                <div style={{ ...S, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: 6 }}>◎ {loc.loc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ ...S, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: loc.isNew ? 'var(--sage)' : 'var(--rust)', border: `1px solid ${loc.isNew ? 'rgba(143,168,130,0.3)' : 'rgba(139,74,42,0.3)'}`, padding: '3px 10px' }}>{loc.isNew ? 'New' : 'Archive'}</span>
                <div style={{ ...S, fontSize: 8, letterSpacing: '0.1em', color: 'rgba(143,168,130,0.4)' }}>{loc.lat.toFixed(2)}°S · {loc.lng.toFixed(2)}°E</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
