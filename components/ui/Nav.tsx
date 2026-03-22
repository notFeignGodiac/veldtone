'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/map', label: 'Locations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '22px 52px',
      background: scrolled
        ? 'rgba(242,237,228,0.97)'
        : 'linear-gradient(to bottom, rgba(242,237,228,0.97) 0%, rgba(242,237,228,0) 100%)',
      borderBottom: scrolled ? '1px solid var(--paper)' : 'none',
      transition: 'background 0.3s, border-color 0.3s',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22, fontWeight: 700,
          color: 'var(--forest)', letterSpacing: '0.06em',
          display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          VELDTONE
          <span style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 8, letterSpacing: '0.2em',
            color: 'var(--faded)', fontWeight: 400,
            textTransform: 'uppercase',
          }}>
            Field Recordings
          </span>
        </div>
      </Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: pathname === l.href ? 'var(--forest)' : 'var(--faded)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              position: 'relative',
            }}>
              {l.label}
              {pathname === l.href && (
                <motion.div layoutId="nav-indicator" style={{
                  position: 'absolute', bottom: -4, left: 0, right: 0,
                  height: 1, background: 'var(--forest)',
                }} />
              )}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 9, letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--forest)',
            textDecoration: 'none',
            border: '1px solid var(--forest)',
            padding: '8px 20px',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'var(--forest)';
            (e.target as HTMLElement).style.color = 'var(--cream)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'transparent';
            (e.target as HTMLElement).style.color = 'var(--forest)';
          }}
          >
            Licensing
          </Link>
        </li>
      </ul>
    </nav>
  );
}
