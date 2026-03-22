'use client';
import { motion } from 'framer-motion';
import { teamMembers } from '@/lib/data';

const PF = { fontFamily:"'Playfair Display',serif" };
const S  = { fontFamily:"'Courier Prime',monospace" };
const CG = { fontFamily:"'Cormorant Garamond',serif" };

const fade = (delay=0) => ({ initial:{opacity:0,y:24}, animate:{opacity:1,y:0}, transition:{delay, duration:0.6} });

export default function About() {
  return (
    <main style={{ paddingTop: 88, minHeight:'100vh' }}>

      {/* Hero split */}
      <section style={{ display:'grid', gridTemplateColumns:'5fr 4fr', minHeight:'80vh' }}>
        {/* Left — forest */}
        <div style={{ background:'var(--forest)', padding:'80px 64px', position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.07, pointerEvents:'none' }} viewBox="0 0 400 600">
            {[180,140,100,60,28].map((r,i)=>(
              <ellipse key={i} cx="200" cy="300" rx={r} ry={r*.75} fill="none" stroke="white" strokeWidth="0.8"/>
            ))}
            <ellipse cx="80" cy="150" rx="60" ry="45" fill="none" stroke="white" strokeWidth="0.5"/>
            <ellipse cx="80" cy="150" rx="35" ry="26" fill="none" stroke="white" strokeWidth="0.5"/>
            <ellipse cx="330" cy="480" rx="55" ry="41" fill="none" stroke="white" strokeWidth="0.5"/>
          </svg>
          <motion.div {...fade(0.1)} style={{ position:'relative', zIndex:1 }}>
            <div style={{ ...S, fontSize:9, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--sage)', marginBottom:28, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:28, height:1, background:'var(--sage)', display:'inline-block' }}/> Our Practice
            </div>
            <h1 style={{ ...PF, fontSize:'clamp(36px,3.5vw,56px)', fontWeight:700, color:'var(--cream)', lineHeight:1.1, marginBottom:28 }}>
              Not music.<br/>Not sound design.<br/><em style={{ fontWeight:300, color:'var(--sage)' }}>Pure place.</em>
            </h1>
            <p style={{ ...CG, fontSize:18, fontStyle:'italic', lineHeight:1.8, color:'rgba(250,246,238,0.75)', maxWidth:480, marginBottom:20 }}>
              We go where most people don't. We wait. We record. We leave nothing behind except microphone footprints.
            </p>
            <p style={{ ...S, fontSize:11, lineHeight:1.9, color:'rgba(250,246,238,0.55)', maxWidth:460, letterSpacing:'0.03em', marginBottom:48 }}>
              VELDTONE was founded in 2018 by a small team of field recordists, acoustic ecologists, and landscape photographers who believed that the world's disappearing sonic environments deserved to be preserved — and heard. Every recording is made with broadcast-grade equipment, at minimum 96kHz/32-bit float, with full metadata and location logs.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              {[
                ['Equipment', 'DPA 4060 binaural, Sennheiser MKH 8020 stereo pair, Aquarian H2a hydrophone, Sound Devices MixPre-10 II'],
                ['Archive', 'Every session stored at original capture resolution. No compression ever applied to master files.'],
                ['Ecology policy', 'Zero disturbance recording. No baiting, no playback, no habitat modification. SANS 10241 aligned.'],
              ].map(([title, text])=>(
                <div key={title} style={{ background:'rgba(242,237,228,0.06)', borderLeft:'2px solid var(--sage)', padding:'16px 20px', ...S, fontSize:10, letterSpacing:'0.08em', color:'rgba(250,246,238,0.7)', lineHeight:1.6 }}>
                  <strong style={{ color:'var(--sage)' }}>{title}:</strong> {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — field journal */}
        <div style={{ background:'var(--paper)', padding:'80px 64px', backgroundImage:'repeating-linear-gradient(to bottom,transparent,transparent 27px,rgba(160,150,130,0.1) 27px,rgba(160,150,130,0.1) 28px)', position:'relative' }}>
          <motion.div {...fade(0.3)} style={{ position:'relative', zIndex:1 }}>
            <div style={{ ...S, fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--rust)', marginBottom:16 }}>Field Note — 14 March 2025 · 04h17</div>
            <h3 style={{ ...PF, fontSize:28, fontWeight:700, color:'var(--ink)', marginBottom:16, lineHeight:1.15 }}>The first light over the escarpment</h3>
            <p style={{ ...CG, fontSize:16, fontStyle:'italic', lineHeight:1.75, color:'var(--faded)', marginBottom:28 }}>
              "Temperature had dropped to –6°C overnight. Everything was frozen still. Then, at precisely 04h22, a single Cape Robin-Chat started. Within four minutes, it was an orchestra. I didn't move for three hours."
            </p>
            <div style={{ width:40, height:1, background:'var(--sage)', margin:'28px 0' }}/>
            <p style={{ ...CG, fontSize:14, fontStyle:'italic', lineHeight:1.75, color:'var(--faded)', marginBottom:20 }}>
              "That recording — 'Drakensberg Dawn Chorus' — is now licensed in two Netflix productions and a video game shipping Q4 2025. We recorded it on spec, in the cold, because we had to."
            </p>
            <p style={{ ...S, fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--rust)' }}>— Sipho Dlamini, Lead Recordist</p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--paper)', marginTop:48 }}>
              {[['7yr','In the field'],['192','kHz max capture'],['94%','Client retention']].map(([n,l])=>(
                <div key={l} style={{ background:'var(--cream)', padding:'20px 16px' }}>
                  <div style={{ ...PF, fontSize:32, fontWeight:900, color:'var(--forest)', lineHeight:1, marginBottom:4 }}>{n}</div>
                  <div style={{ ...S, fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--faded)', lineHeight:1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding:'120px 52px', background:'var(--bone)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64 }}>
          <h2 style={{ ...PF, fontSize:'clamp(36px,4vw,60px)', fontWeight:700, color:'var(--ink)', lineHeight:1.05 }}>The <em style={{ color:'var(--forest)' }}>recordists</em></h2>
          <p style={{ ...S, fontSize:10, letterSpacing:'0.14em', color:'var(--faded)', maxWidth:240, textAlign:'right', lineHeight:1.7, textTransform:'uppercase' }}>Four people. Thousands of hours. No studio work. Ever.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--paper)' }}>
          {teamMembers.map((m,i)=>(
            <motion.div key={m.name} {...fade(0.1+i*0.08)}
              data-hover
              style={{ background:'var(--cream)', padding:'36px 28px 32px', position:'relative', overflow:'hidden', transition:'background 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='var(--bone)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='var(--cream)'}
            >
              <div style={{ width:52, height:52, background:'var(--forest)', display:'flex', alignItems:'center', justifyContent:'center', ...PF, fontSize:18, fontWeight:700, fontStyle:'italic', color:'var(--cream)', marginBottom:20 }}>{m.initials}</div>
              <div style={{ ...PF, fontSize:20, fontWeight:700, color:'var(--ink)', marginBottom:4, lineHeight:1.15 }}>{m.name}</div>
              <div style={{ ...S, fontSize:8, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--rust)', marginBottom:18 }}>{m.role}</div>
              <p style={{ ...CG, fontSize:14, fontStyle:'italic', lineHeight:1.7, color:'var(--faded)', marginBottom:20 }}>{m.bio}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:5, borderTop:'1px solid var(--paper)', paddingTop:18 }}>
                <div style={{ ...S, fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--faded)', display:'flex', gap:6 }}><strong style={{ color:'var(--forest)' }}>Kit:</strong>{m.kit}</div>
                <div style={{ ...S, fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--faded)', display:'flex', gap:6 }}><strong style={{ color:'var(--forest)' }}>Focus:</strong>{m.speciality}</div>
                <div style={{ ...S, fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--faded)', display:'flex', gap:6 }}><strong style={{ color:'var(--forest)' }}>Sessions:</strong>{m.sessions}</div>
              </div>
              <div style={{ position:'absolute', bottom:20, right:20, ...PF, fontSize:52, fontWeight:900, color:'rgba(45,74,45,0.06)', lineHeight:1, pointerEvents:'none' }}>{m.sessions}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
