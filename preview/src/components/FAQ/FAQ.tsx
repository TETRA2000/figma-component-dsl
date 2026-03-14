import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/Container/Container';
import { Badge } from '@/components/Badge/Badge';
import type { FAQItem } from '@/components/types';
import styles from './FAQ.module.css';

interface FAQProps {
  badge?: string;
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FAQ({ badge, title, subtitle, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <Container maxWidth="md">
        <div className={styles.header}>
          {badge && <Badge variant="primary">{badge}</Badge>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.list}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{item.question}</span>
                  <ChevronDown size={20} className={styles.chevron} />
                </button>
                <div className={styles.content}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
