'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LoadingScreen from '@/components/ui/LoadingScreen';
import TrustedBy from '@/components/sections/TrustedBy';
import { tracks, testimonials, faqs } from '@/lib/data';
import { useDemo } from '@/components/ui/ClientShell';

export default function Home() {
  const { openDemo } = useDemo();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let phase = 0, raf: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);
    const dw = (amp: number, freq: number, p: number, color: string, off: number) => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      for (let x = 0; x <= W; x += 2) {
        const y = H/2 + Math.sin(x*freq+p)*amp*H + Math.sin(x*freq*1.7+p*1.3)*amp*0.5*H + Math.sin(x*freq*0.4+p*0.7)*amp*0.3*H + off;
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.stroke();
    };
    const animate = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='#2D4A2D'; ctx.fillRect(0,0,W,H);
      const g = ctx.createRadialGradient(W*.3,H*.4,0,W*.3,H*.4,W*.7);
      g.addColorStop(0,'rgba(74,103,65,0.4)'); g.addColorStop(1,'rgba(30,50,30,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      phase+=0.015;
      dw(0.18,0.008,phase,'rgba(143,168,130,0.15)',-6);
      dw(0.12,0.014,-phase,'rgba(143,168,130,0.1)',6);
      dw(0.08,0.022,phase*1.3,'rgba(143,168,130,0.07)',0);
      dw(0.22,0.005,-phase*.7,'rgba(143,168,130,0.06)',12);
      raf=requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  }, []);

  const S = { fontFamily:"'Courier Prime',monospace" };
  const PF = { fontFamily:"'Playfair Display',serif" };
  const CG = { fontFamily:"'Cormorant Garamond',serif" };

  return (
    <>
      <LoadingScreen />

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', position:'relative', overflow:'hidden' }}>
        <div style={{
          padding:'160px 52px 80px', display:'flex', flexDirection:'column', justifyContent:'flex-end',
          background:'var(--cream)', borderRight:'1px solid var(--paper)', position:'relative', zIndex:2,
          backgroundImage:'repeating-linear-gradient(to bottom,transparent,transparent 31px,rgba(160,150,130,0.1) 31px,rgba(160,150,130,0.1) 32px)',
        }}>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            <div style={{...S, fontSize:9, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--rust)', marginBottom:20, display:'flex', alignItems:'center', gap:10}}>
              <span style={{animation:'pulse 2.4s ease-in-out infinite'}}>●</span>
              Live from the field — 3 new recordings this month
            </div>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
            style={{...PF, fontSize:'clamp(52px,6.5vw,96px)', fontWeight:900, lineHeight:0.95, color:'var(--ink)', letterSpacing:'-0.01em'}}>
            Sound of<br/>
            <em style={{color:'var(--forest)', fontWeight:400}}>the wild</em><br/>
            <span style={{borderBottom:'3px solid var(--rust)', lineHeight:1.1, display:'inline-block'}}>African veld</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
            style={{...CG, fontSize:18, fontStyle:'italic', lineHeight:1.7, color:'var(--faded)', margin:'28px 0 40px', maxWidth:380}}>
            Atmospheric field recordings captured across Southern Africa's most remote and sonically extraordinary landscapes.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.55}}
            style={{display:'flex', gap:16, alignItems:'center', flexWrap:'wrap'}}>
            <Link href="/catalogue" style={{background:'var(--forest)', color:'var(--cream)', padding:'16px 36px', ...S, fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none'}}>Browse Catalogue</Link>
            <Link href="/contact" style={{color:'var(--forest)', borderBottom:'1px solid var(--sage)', paddingBottom:2, ...S, fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', textDecoration:'none'}}>Licensing Info →</Link>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.7}}
            style={{display:'flex', gap:32, marginTop:56, paddingTop:24, borderTop:'1px solid var(--paper)'}}>
            {[['340+','Recordings'],['28','Locations'],['96kHz','Max sample rate']].map(([n,l])=>(
              <div key={l}>
                <div style={{...PF, fontSize:28, fontWeight:700, color:'var(--forest)', lineHeight:1}}>{n}</div>
                <div style={{...S, fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--faded)', marginTop:4}}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div style={{position:'relative', overflow:'hidden', background:'var(--forest)'}}>
          <canvas ref={canvasRef} style={{position:'absolute', inset:0, width:'100%', height:'100%'}} />
          <div style={{position:'absolute', top:48, right:48, zIndex:3, display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
            {['◎ Karoo, Northern Cape','◎ Recorded 04h32 · –3°C'].map(t=>(
              <div key={t} style={{...S, fontSize:8, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(143,168,130,0.8)'}}>{t}</div>
            ))}
          </div>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
            style={{position:'absolute', bottom:48, left:48, right:48, zIndex:3, background:'rgba(242,237,228,0.08)', border:'1px solid rgba(242,237,228,0.15)', backdropFilter:'blur(4px)', padding:'24px 28px'}}>
            <div style={{...S, fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--sage)', marginBottom:14}}>◆ Featured Recording</div>
            <div style={{...PF, fontSize:26, fontWeight:700, color:'var(--cream)', marginBottom:4}}>Karoo Thunderstorm at Dawn</div>
            <div style={{...S, fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--sage)', marginBottom:20}}>Loxton, Northern Cape · April 2025</div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{...S, fontSize:10, color:'var(--sage)', letterSpacing:'0.1em'}}>48:22 · WAV 96kHz/32bit</span>
              <button data-hover onClick={()=>openDemo(1)} style={{width:36, height:36, borderRadius:'50%', border:'1px solid var(--sage)', background:'transparent', color:'var(--sage)', fontSize:12, display:'flex', alignItems:'center', justifyContent:'center'}}>▶</button>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustedBy />

      {/* CATALOGUE PREVIEW */}
      <section style={{padding:'120px 52px', background:'var(--bone)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48}}>
          <h2 style={{...PF, fontSize:'clamp(36px,4vw,60px)', fontWeight:700, color:'var(--ink)', lineHeight:1.05}}>The <em style={{color:'var(--forest)'}}>recordings</em></h2>
          <Link href="/catalogue" style={{...S, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--forest)', textDecoration:'none', borderBottom:'1px solid var(--sage)', paddingBottom:2}}>View full catalogue →</Link>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--paper)', border:'1px solid var(--paper)'}}>
          {tracks.slice(0,3).map(track=>(
            <div key={track.id} data-hover onClick={()=>openDemo(track.id)}
              style={{background:'var(--cream)', padding:'32px 28px', position:'relative', overflow:'hidden', transition:'background 0.25s'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--bone)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--cream)'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:20, ...S, fontSize:9, letterSpacing:'0.2em', color:'var(--faded)'}}>
                <span>{track.num}</span>
                <span style={{background:track.tagColor==='forest'?'var(--forest)':track.tagColor==='faded'?'var(--faded)':'var(--rust)', color:'var(--cream)', fontSize:7, letterSpacing:'0.25em', padding:'3px 9px'}}>{track.tag}</span>
              </div>
              <div style={{...PF, fontSize:22, fontWeight:700, color:'var(--ink)', marginBottom:6, lineHeight:1.15}}>{track.title}</div>
              <div style={{...S, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--faded)', marginBottom:16}}>◎ {track.location}</div>
              <p style={{...CG, fontSize:15, fontStyle:'italic', lineHeight:1.65, color:'var(--faded)', marginBottom:28}}>{track.desc}</p>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:20, borderTop:'1px solid var(--paper)'}}>
                <div style={{...PF, fontSize:20, fontWeight:700, color:'var(--forest)'}}>R{track.price} <span style={{fontSize:10, ...S, color:'var(--faded)', fontWeight:400}}>/ licence</span></div>
                <div style={{...S, fontSize:9, color:'var(--faded)'}}>{track.duration}</div>
              </div>
              <div style={{...S, fontSize:8, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--sage)', marginTop:10, opacity:0.6, display:'flex', alignItems:'center', gap:6}}>▶ Click to listen — demo</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'120px 52px', background:'var(--ink)', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', ...PF, fontSize:'22vw', fontWeight:900, fontStyle:'italic', color:'rgba(255,255,255,0.02)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', whiteSpace:'nowrap', pointerEvents:'none', userSelect:'none'} as React.CSSProperties}>Heard.</div>
        <div style={{textAlign:'center', marginBottom:72, position:'relative', zIndex:2}}>
          <div style={{...S, fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--sage)', marginBottom:18}}>What creators say</div>
          <h2 style={{...PF, fontSize:'clamp(36px,4.5vw,64px)', fontWeight:700, color:'var(--cream)', lineHeight:1.05}}>Sound that <em style={{fontWeight:300, color:'var(--sage)'}}>moves</em> the work</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'rgba(255,255,255,0.05)', maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2}}>
          {testimonials.map((t,i)=>(
            <div key={i} data-hover style={{background:'var(--ink)', padding:'44px 36px', position:'relative', overflow:'hidden', transition:'background 0.25s'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#181d16'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--ink)'}}>
              <span style={{position:'absolute', top:24, right:24, ...S, fontSize:7, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(143,168,130,0.4)', border:'1px solid rgba(143,168,130,0.15)', padding:'3px 9px'}}>{t.company}</span>
              <div style={{position:'absolute', top:8, left:24, ...PF, fontSize:96, color:'rgba(143,168,130,0.1)', lineHeight:1, pointerEvents:'none'}}>"</div>
              <p style={{...CG, fontSize:17, fontStyle:'italic', lineHeight:1.75, color:'rgba(250,246,238,0.8)', marginBottom:32, marginTop:24, position:'relative', zIndex:1}}>"{t.quote}"</p>
              <div style={{width:32, height:1, background:'var(--sage)', marginBottom:20}}/>
              <div style={{...S, fontSize:10, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--cream)', marginBottom:4}}>{t.name}</div>
              <div style={{...S, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--sage)'}}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{padding:'100px 52px', background:'var(--paper)', borderTop:'1px solid rgba(160,150,130,0.2)', backgroundImage:'repeating-linear-gradient(to bottom,transparent,transparent 27px,rgba(160,150,130,0.07) 27px,rgba(160,150,130,0.07) 28px)'}}>
        <div style={{maxWidth:800, margin:'0 auto', textAlign:'center'}}>
          <div style={{...S, fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--rust)', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'center', gap:12}}>
            <span style={{width:40, height:1, background:'var(--rust)', opacity:0.4, display:'inline-block'}}/>Field Dispatch<span style={{width:40, height:1, background:'var(--rust)', opacity:0.4, display:'inline-block'}}/>
          </div>
          <h2 style={{...PF, fontSize:'clamp(32px,4vw,56px)', fontWeight:700, color:'var(--ink)', lineHeight:1.1, marginBottom:16}}>Hear it <em style={{color:'var(--forest)'}}>first</em></h2>
          <p style={{...CG, fontSize:18, fontStyle:'italic', color:'var(--faded)', lineHeight:1.7, maxWidth:560, margin:'0 auto 40px'}}>New recordings, expedition reports, and licensing news — sent once a month. No marketing. Just field notes.</p>
          {!subscribed ? (
            <>
              <div style={{display:'flex', maxWidth:520, margin:'0 auto 16px', border:'1px solid rgba(160,150,130,0.3)', background:'var(--cream)'}}>
                <input type="email" value={newsEmail} onChange={e=>setNewsEmail(e.target.value)} placeholder="your@studio.com" data-hover
                  style={{flex:1, background:'transparent', border:'none', padding:'18px 24px', ...S, fontSize:11, letterSpacing:'0.06em', color:'var(--ink)', outline:'none'}}/>
                <button data-hover onClick={()=>{if(newsEmail.includes('@'))setSubscribed(true);}}
                  style={{background:'var(--forest)', color:'var(--cream)', border:'none', padding:'18px 32px', ...S, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', whiteSpace:'nowrap'}}>Subscribe →</button>
              </div>
              <p style={{...S, fontSize:9, letterSpacing:'0.12em', color:'var(--faded)', fontStyle:'italic'}}>No frequency beyond monthly. Unsubscribe any time.</p>
            </>
          ) : (
            <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{...PF, fontSize:20, fontStyle:'italic', color:'var(--forest)'}}>You're in. First dispatch arrives when we're back from the field.</motion.p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'120px 52px', background:'var(--cream)', borderTop:'1px solid var(--paper)'}}>
        <div style={{maxWidth:860, margin:'0 auto'}}>
          <div style={{marginBottom:56}}>
            <h2 style={{...PF, fontSize:'clamp(36px,4vw,60px)', fontWeight:700, color:'var(--ink)', lineHeight:1.05, marginBottom:12}}>Common <em style={{color:'var(--forest)'}}>questions</em></h2>
            <p style={{...CG, fontSize:17, fontStyle:'italic', color:'var(--faded)', lineHeight:1.6}}>Everything you need before making a decision. If it's not here, just email us.</p>
          </div>
          {faqs.map((faq,i)=>(
            <div key={i} style={{borderTop:'1px solid var(--paper)', ...(i===faqs.length-1?{borderBottom:'1px solid var(--paper)'}:{})}}>
              <div data-hover onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 8px', gap:20, color:openFaq===i?'var(--forest)':'var(--ink)', transition:'color 0.2s'}}>
                <span style={{...PF, fontSize:18, fontWeight:700, lineHeight:1.2, color:'inherit'}}>{faq.q}</span>
                <span style={{width:28, height:28, border:'1px solid', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:16, color:openFaq===i?'var(--cream)':'var(--faded)', background:openFaq===i?'var(--forest)':'transparent', borderColor:openFaq===i?'var(--forest)':'var(--paper)', transform:openFaq===i?'rotate(45deg)':'none', transition:'all 0.3s'}}>+</span>
              </div>
              <motion.div initial={false} animate={{height:openFaq===i?'auto':0, opacity:openFaq===i?1:0}} transition={{duration:0.35}} style={{overflow:'hidden'}}>
                <p style={{...CG, fontSize:16, fontStyle:'italic', lineHeight:1.8, color:'var(--faded)', borderLeft:'2px solid var(--sage)', paddingLeft:20, margin:'0 8px 28px'}}>{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
    </>
  );
}
