import { Container } from '@/components/Container/Container';
import { Button } from '@/components/Button/Button';
import styles from './CTABanner.module.css';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export function CTABanner({
  title,
  subtitle,
  primaryCta,
  primaryHref = '#',
  secondaryCta,
  secondaryHref = '#',
}: CTABannerProps) {
  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.banner}>
          <div className={styles.glow} />
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.actions}>
            <Button href={primaryHref} size="lg" variant="secondary">
              {primaryCta}
            </Button>
            {secondaryCta && (
              <Button href={secondaryHref} size="lg" variant="ghost">
                {secondaryCta}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
