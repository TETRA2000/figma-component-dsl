import { Container } from '@/components/Container/Container';
import styles from './LogoCloud.module.css';

type Variant = 'grid' | 'scroll';

interface LogoCloudProps {
  title?: string;
  logos: { name: string; src: string }[];
  variant?: Variant;
}

export function LogoCloud({ title, logos, variant = 'grid' }: LogoCloudProps) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        {title && <p className={styles.title}>{title}</p>}
        {variant === 'grid' ? (
          <div className={styles.grid}>
            {logos.map((logo) => (
              <div key={logo.name} className={styles.logoWrap}>
                <img src={logo.src} alt={logo.name} className={styles.logo} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.scrollOuter}>
            <div className={styles.scrollTrack}>
              {[...logos, ...logos].map((logo, i) => (
                <div key={i} className={styles.logoWrap}>
                  <img src={logo.src} alt={logo.name} className={styles.logo} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
