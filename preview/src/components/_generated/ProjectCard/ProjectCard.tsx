import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title?: string;
  description?: string;
  tags?: string[];
  accentColor?: string;
}

export function ProjectCard({
  title = 'Brand Identity Redesign',
  description = 'A complete visual overhaul for a fintech startup, including logo, typography, and brand guidelines.',
  tags = ['Branding', 'Visual Design'],
  accentColor = '#6366f1',
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.imageArea}
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, #1a1a1a 100%)`,
        }}
      >
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
