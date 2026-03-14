import { Container } from '@/components/Container/Container';
import type { FooterColumn } from '@/components/types';
import type { ReactNode } from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  logo: string;
  description: string;
  columns: FooterColumn[];
  socialLinks?: { icon: ReactNode; href: string; label: string }[];
  copyright?: string;
}

export function Footer({
  logo,
  description,
  columns,
  socialLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="xl">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{logo}</span>
            <p className={styles.description}>{description}</p>
            {socialLinks && (
              <div className={styles.social}>
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className={styles.socialLink}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          {columns.map((col, i) => (
            <div key={i} className={styles.column}>
              <h4 className={styles.columnTitle}>{col.title}</h4>
              <ul className={styles.linkList}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {copyright && (
          <div className={styles.bottom}>
            <p className={styles.copyright}>{copyright}</p>
          </div>
        )}
      </Container>
    </footer>
  );
}
