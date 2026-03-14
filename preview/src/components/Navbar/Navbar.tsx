import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { Container } from '@/components/Container/Container';
import type { NavLink } from '@/components/types';
import styles from './Navbar.module.css';

interface NavbarProps {
  logo: string;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function Navbar({ logo, links, ctaLabel = 'Get Started', ctaHref = '#' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <Container maxWidth="xl">
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            {logo}
          </a>

          <div className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
            {links.map((link) => (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
            <div className={styles.mobileCta}>
              <Button href={ctaHref} size="sm" fullWidth>
                {ctaLabel}
              </Button>
            </div>
          </div>

          <div className={styles.actions}>
            <Button href={ctaHref} size="sm" className={styles.desktopCta}>
              {ctaLabel}
            </Button>
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
