import type { ReactNode } from 'react';
import { Container } from '@/components/Container/Container';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import styles from './Hero.module.css';

type Alignment = 'center' | 'left';

interface HeroProps {
  badge?: string;
  title: string;
  gradientText?: string;
  subtitle: string;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  image?: ReactNode;
  alignment?: Alignment;
}

export function Hero({
  badge,
  title,
  gradientText,
  subtitle,
  primaryCta,
  primaryHref = '#',
  secondaryCta,
  secondaryHref = '#',
  image,
  alignment = 'center',
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${styles[alignment]}`}>
      <div className={styles.bgGlow} />
      <Container maxWidth="lg">
        <div className={styles.content}>
          {badge && (
            <Badge variant="primary">{badge}</Badge>
          )}
          <h1 className={styles.title}>
            {title}
            {gradientText && (
              <>
                <br />
                <span className={styles.gradient}>{gradientText}</span>
              </>
            )}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <Button href={primaryHref} size="lg">
              {primaryCta}
            </Button>
            {secondaryCta && (
              <Button href={secondaryHref} variant="outline" size="lg">
                {secondaryCta}
              </Button>
            )}
          </div>
        </div>
        {image && <div className={styles.image}>{image}</div>}
      </Container>
    </section>
  );
}
