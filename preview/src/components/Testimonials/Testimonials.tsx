import { Container } from '@/components/Container/Container';
import { Badge } from '@/components/Badge/Badge';
import { TestimonialCard } from '@/components/TestimonialCard/TestimonialCard';
import type { Testimonial } from '@/components/types';
import styles from './Testimonials.module.css';

interface TestimonialsProps {
  badge?: string;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function Testimonials({ badge, title, subtitle, testimonials }: TestimonialsProps) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.header}>
          {badge && <Badge variant="primary">{badge}</Badge>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
