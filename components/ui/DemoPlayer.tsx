'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tracks } from '@/lib/data';

interface DemoPlayerProps {
  trackId: number | null;
  onClose: () => void;
}

export default function DemoPlayer({ trackId, onClose }: DemoPlayerProps) {
  const track = tracks.find(t => t.id === trackId);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const offsetRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(30); // 30s demo tone

  // Generate a synthesised ambient tone as demo audio
  const createDemoBuffer = useCallback((ctx: AudioContext, freqProfile: number[]) => {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * 30; // 30 seconds
    const buffer = ctx.createBuffer(2, length, sampleRate);

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const profileIdx = Math.floor((i / length) * freqProfile.length);
        const amp = freqProfile[profileIdx] || 0.5;

        // Layered sine waves for ambient texture
        const base = 60 + (ch * 2);
        data[i] =
          Math.sin(2 * Math.PI * base * t) * 0.15 * amp +
          Math.sin(2 * Math.PI * (base * 1.5) * t) * 0.08 * amp +
          Math.sin(2 * Math.PI * (base * 2.1) * t) * 0.05 * amp +
          Math.sin(2 * Math.PI * (base * 3.3) * t) * 0.03 * amp +
          (Math.random() * 2 - 1) * 0.04 * amp; // noise
      }
    }
    return buffer;
  }, []);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Draw waveform
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(143,168,130,0.8)';
    ctx.lineWidth = 1.5;

    const sliceWidth = W / data.length;
    let x = 0;
    for (let i = 0; i < data.length; i++) {
      const v = data[i] / 128.0;
      const y = (v * H) / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }
    ctx.stroke();

    // Progress line
    const px = (progress / duration) * W;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(139,74,42,0.6)';
    ctx.lineWidth = 1;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, H);
    ctx.stroke();

    rafRef.current = requestAnimationFrame(drawWaveform);
  }, [progress, duration]);

  const startPlayback = useCallback(async () => {
    if (!track) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    // Stop existing
    if (sourceRef.current) { try { sourceRef.current.stop(); } catch {} }

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyserRef.current = analyser;

    const buffer = createDemoBuffer(ctx, track.freqProfile);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    source.start(0, offsetRef.current);
    source.onended = () => { if (playing) { setPlaying(false); setProgress(0); offsetRef.current = 0; } };
    sourceRef.current = source;
    startTimeRef.current = ctx.currentTime - offsetRef.current;
    setPlaying(true);
  }, [track, playing, createDemoBuffer]);

  const pausePlayback = useCallback(() => {
    if (sourceRef.current) {
      offsetRef.current = audioCtxRef.current ? audioCtxRef.current.currentTime - startTimeRef.current : 0;
      try { sourceRef.current.stop(); } catch {}
    }
    setPlaying(false);
  }, []);

  // Progress tracker
  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => {
      if (audioCtxRef.current) {
        const elapsed = audioCtxRef.current.currentTime - startTimeRef.current;
        setProgress(Math.min(elapsed, duration));
        if (elapsed >= duration) { setPlaying(false); setProgress(0); offsetRef.current = 0; }
      }
    }, 100);
    return () => clearInterval(iv);
  }, [playing, duration]);

  // Waveform draw loop
  useEffect(() => {
    if (playing) { rafRef.current = requestAnimationFrame(drawWaveform); }
    else { cancelAnimationFrame(rafRef.current); }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, drawWaveform]);

  // Reset on track change
  useEffect(() => {
    pausePlayback();
    setProgress(0);
    offsetRef.current = 0;
  }, [trackId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try { sourceRef.current?.stop(); } catch {}
      audioCtxRef.current?.close();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleClose = () => {
    pausePlayback();
    onClose();
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <AnimatePresence>
      {trackId !== null && track && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 800,
            background: 'var(--ink)',
            borderTop: '2px solid var(--forest)',
            padding: '0 52px',
            height: 80,
            display: 'flex', alignItems: 'center', gap: 28,
          }}
        >
          {/* Close */}
          <button onClick={handleClose} style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid rgba(143,168,130,0.3)',
            background: 'transparent', color: 'var(--sage)',
            fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>✕</button>

          {/* Track info */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 15, fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1,
            }}>{track.title}</div>
            <div style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--sage)', marginTop: 3,
            }}>{track.location} · {track.format}</div>
          </div>

          {/* Waveform canvas */}
          <div style={{ flex: 1, height: 48, position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} width={800} height={48}
              style={{ width: '100%', height: '100%', display: 'block' }} />
            {!playing && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
                {track.freqProfile.map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h * 100}%`,
                    background: i < (progress / duration) * track.freqProfile.length
                      ? 'rgba(139,74,42,0.6)' : 'rgba(143,168,130,0.3)',
                    borderRadius: 1,
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* Play button */}
          <button
            onClick={playing ? pausePlayback : startPlayback}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--forest)', border: 'none',
              color: 'var(--cream)', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {playing ? '⏸' : '▶'}
          </button>

          {/* Time */}
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 9, letterSpacing: '0.12em', color: 'var(--sage)',
            flexShrink: 0, minWidth: 80, textAlign: 'right',
          }}>
            {fmt(progress)} / {fmt(duration)}
          </div>

          {/* Demo badge */}
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(143,168,130,0.4)',
            border: '1px solid rgba(143,168,130,0.15)',
            padding: '4px 10px', flexShrink: 0,
          }}>
            30s Demo
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
