import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} HearWithHeart — every child deserves a voice.
          <Heart size={14} className={styles.heart} fill="currentColor" />
        </p>
      </div>
    </footer>
  );
}
