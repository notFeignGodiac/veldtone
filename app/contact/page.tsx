'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PF = { fontFamily:"'Playfair Display',serif" };
const S  = { fontFamily:"'Courier Prime',monospace" };
const CG = { fontFamily:"'Cormorant Garamond',serif" };

const LICENCES = ['Field Licence — R180 (Personal)', 'Studio Licence — R620 (Professional)', 'Archive / Enterprise (POA)', 'Custom Commission', 'Just asking a question'];

export default function Contact() {
  const [form, setForm] = useState({ name:'', company:'', email:'', licence:'', project:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Tell us about your project';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400)); // simulate submit
    setLoading(false);
    setSubmitted(true);
  };

  const input = (field: keyof typeof form, label: string, placeholder: string, type='text') => (
    <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
      <label style={{ ...S, fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color: errors[field] ? 'var(--rust)' : 'var(--sage)' }}>
        {label}{errors[field] ? ` — ${errors[field]}` : ''}
      </label>
      <input type={type} value={form[field]} placeholder={placeholder} data-hover
        onChange={e => { setForm(f=>({...f,[field]:e.target.value})); setErrors(er=>({...er,[field]:''})); }}
        style={{ background:'var(--ink)', border:`1px solid ${errors[field]?'var(--rust)':'rgba(143,168,130,0.2)'}`, color:'var(--cream)', padding:'14px 18px', ...S, fontSize:11, letterSpacing:'0.04em', outline:'none', transition:'border-color 0.2s', width:'100%' }}
        onFocus={e=>(e.target as HTMLElement).style.borderColor='var(--sage)'}
        onBlur={e=>(e.target as HTMLElement).style.borderColor=errors[field]?'var(--rust)':'rgba(143,168,130,0.2)'}
      />
    </div>
  );

  return (
    <main style={{ paddingTop:88, minHeight:'100vh', background:'var(--ink)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'calc(100vh - 88px)' }}>

        {/* Left info panel */}
        <div style={{ padding:'80px 64px', background:'#151814', borderRight:'1px solid rgba(143,168,130,0.1)', position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.04, pointerEvents:'none' }} viewBox="0 0 400 600">
            {[160,120,80,45].map((r,i)=>(<ellipse key={i} cx="200" cy="300" rx={r} ry={r*.7} fill="none" stroke="white" strokeWidth="1"/>))}
          </svg>
          <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.6}} style={{position:'relative',zIndex:1}}>
            <div style={{ ...S, fontSize:9, letterSpacing:'0.32em', textTransform:'uppercase', color:'var(--sage)', marginBottom:24, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:24, height:1, background:'var(--sage)', display:'inline-block' }}/> Get in touch
            </div>
            <h1 style={{ ...PF, fontSize:'clamp(40px,4vw,64px)', fontWeight:700, color:'var(--cream)', lineHeight:1.0, marginBottom:32 }}>
              Let's talk<br/><em style={{ fontWeight:300, color:'var(--sage)' }}>sound.</em>
            </h1>
            <p style={{ ...CG, fontSize:18, fontStyle:'italic', lineHeight:1.8, color:'rgba(250,246,238,0.6)', marginBottom:56, maxWidth:360 }}>
              Whether you're licensing a single recording or commissioning a full expedition — we'd love to hear what you're building.
            </p>

            {/* Licensing tiers */}
            <div style={{ ...S, fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(143,168,130,0.5)', marginBottom:20 }}>Licensing tiers</div>
            <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
              {[['Field','R180','Personal projects, YouTube, podcasts'],['Studio','R620','Broadcast, film, games, advertising'],['Archive','POA','Enterprise, full catalogue, exclusivity']].map(([tier,price,desc])=>(
                <div key={tier} style={{ display:'flex', gap:20, padding:'18px 20px', background:'rgba(255,255,255,0.03)', borderLeft:'2px solid rgba(143,168,130,0.2)', alignItems:'center' }}>
                  <div style={{ flexShrink:0 }}>
                    <div style={{ ...PF, fontSize:18, fontWeight:700, color:'var(--cream)' }}>{tier}</div>
                    <div style={{ ...S, fontSize:11, color:'var(--sage)', fontWeight:700 }}>{price}</div>
                  </div>
                  <div style={{ ...S, fontSize:9, letterSpacing:'0.08em', color:'rgba(250,246,238,0.4)', lineHeight:1.5 }}>{desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:48, paddingTop:32, borderTop:'1px solid rgba(143,168,130,0.1)' }}>
              <div style={{ ...S, fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(143,168,130,0.4)', marginBottom:12 }}>Direct contact</div>
              <div style={{ ...CG, fontSize:16, fontStyle:'italic', color:'rgba(250,246,238,0.5)', lineHeight:1.7 }}>
                hello@veldtone.co.za<br/>+27 21 448 7203<br/>Cape Town, ZA
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — form */}
        <div style={{ padding:'80px 64px', background:'var(--ink)', position:'relative' }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div style={{ ...S, fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--sage)', marginBottom:8 }}>Licensing enquiry</div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  {input('name','Your Name','Sipho Dlamini')}
                  {input('company','Company / Studio','Naughty Dog, Netflix...')}
                </div>
                {input('email','Email Address','hello@studio.com','email')}

                {/* Licence select */}
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  <label style={{ ...S, fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--sage)' }}>Licence Interest</label>
                  <select value={form.licence} data-hover onChange={e=>setForm(f=>({...f,licence:e.target.value}))}
                    style={{ background:'var(--ink)', border:'1px solid rgba(143,168,130,0.2)', color: form.licence ? 'var(--cream)' : 'rgba(143,168,130,0.4)', padding:'14px 18px', ...S, fontSize:11, outline:'none', width:'100%' }}>
                    <option value="">Select licence type...</option>
                    {LICENCES.map(l=>(<option key={l} value={l} style={{ background:'var(--ink)', color:'var(--cream)' }}>{l}</option>))}
                  </select>
                </div>

                {input('project','Project / Production','Documentary, game title, brand name...')}

                {/* Textarea */}
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  <label style={{ ...S, fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color: errors.message ? 'var(--rust)' : 'var(--sage)' }}>
                    Message{errors.message ? ` — ${errors.message}` : ''}
                  </label>
                  <textarea value={form.message} placeholder="Tell us what you're working on, which recordings interest you, and any specific requirements..." data-hover
                    onChange={e=>{setForm(f=>({...f,message:e.target.value}));setErrors(er=>({...er,message:''}));}}
                    rows={5}
                    style={{ background:'var(--ink)', border:`1px solid ${errors.message?'var(--rust)':'rgba(143,168,130,0.2)'}`, color:'var(--cream)', padding:'14px 18px', ...S, fontSize:11, letterSpacing:'0.04em', outline:'none', resize:'vertical', transition:'border-color 0.2s', width:'100%' }}
                    onFocus={e=>(e.target as HTMLElement).style.borderColor='var(--sage)'}
                    onBlur={e=>(e.target as HTMLElement).style.borderColor=errors.message?'var(--rust)':'rgba(143,168,130,0.2)'}
                  />
                </div>

                <button data-hover onClick={handleSubmit} disabled={loading}
                  style={{ background: loading ? 'var(--moss)' : 'var(--sage)', color:'var(--ink)', border:'none', padding:'18px 40px', ...S, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', alignSelf:'flex-start', transition:'background 0.2s, transform 0.15s', opacity: loading ? 0.7 : 1 }}>
                  {loading ? '◉ Sending...' : 'Send Enquiry →'}
                </button>

                <p style={{ ...S, fontSize:9, letterSpacing:'0.1em', color:'rgba(143,168,130,0.35)', fontStyle:'italic' }}>
                  We typically respond within 48 hours. For urgent licensing, call directly.
                </p>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} transition={{duration:0.5}}
                style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', height:'100%', gap:24 }}>
                <div style={{ width:64, height:64, background:'var(--sage)', display:'flex', alignItems:'center', justifyContent:'center', ...PF, fontSize:28, color:'var(--ink)', fontStyle:'italic' }}>✓</div>
                <h2 style={{ ...PF, fontSize:'clamp(32px,3vw,52px)', fontWeight:700, color:'var(--cream)', lineHeight:1.05 }}>
                  Message<br/><em style={{ color:'var(--sage)', fontWeight:300 }}>received.</em>
                </h2>
                <p style={{ ...CG, fontSize:18, fontStyle:'italic', color:'rgba(250,246,238,0.6)', lineHeight:1.7, maxWidth:400 }}>
                  We're somewhere in the field right now, but we'll be back. Expect a reply within 48 hours — usually sooner.
                </p>
                <div style={{ ...S, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--sage)', display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ animation:'pulse 2s ease-in-out infinite', display:'inline-block' }}>●</span>
                  hello@veldtone.co.za for urgent enquiries
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
    </main>
  );
}
