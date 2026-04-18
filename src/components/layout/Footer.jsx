import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ExternalLink, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LogoIcon from '../ui/LogoIcon';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/resources', label: 'Resources' },
  { to: '/milestones',label: 'Milestones' },
];

const GOVT_LINKS = [
  { label: 'ADIP Scheme',    url: 'https://www.disabilityaffairs.gov.in' },
  { label: 'UDID Card',      url: 'https://www.swavlambancard.gov.in' },
  { label: 'Niramaya ID',    url: 'https://thenationaltrust.gov.in' },
  { label: 'RBSK Program',   url: 'https://rbsk.gov.in' },
];

const SOCIAL = [
  { Icon: Facebook,  href: '#', label: 'Facebook' },
  { Icon: Twitter,   href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube,   href: '#', label: 'YouTube' },
];

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>

        {/* ── Brand Column ── */}
        <div className={styles.brand}>
          <Link to={isAuthenticated ? '/dashboard' : '/'} className={styles.logo} aria-label="HearWithHeart">
            <LogoIcon size={36} />
            <span className={styles.logoText}>
              Hear<span className={styles.logoAccent}>With</span>Heart
            </span>
          </Link>
          <p className={styles.tagline}>
            Empowering parents to support their child's cognitive, motor, and socio-emotional development — right at home.
          </p>
          <div className={styles.social}>
            {SOCIAL.map(({ Icon, href, label }) => (
              <a key={label} href={href} className={styles.socialBtn} aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className={styles.contact}>
            <span><Mail size={14} /> support@hearwithheart.in</span>
            <span><Phone size={14} /> +91 98765 43210</span>
            <span><MapPin size={14} /> India</span>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={styles.footLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Govt Schemes ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Govt. Resources</h4>
          <ul className={styles.linkList}>
            {GOVT_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className={styles.footLink}>
                  {l.label} <ExternalLink size={12} className={styles.ext} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Helpline ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Helplines</h4>
          <ul className={styles.helpList}>
            <li className={styles.helpItem}>
              <strong>Disability Helpline</strong>
              <span>1800-11-0031</span>
            </li>
            <li className={styles.helpItem}>
              <strong>AYJNISHD</strong>
              <span>022-2639-4600</span>
            </li>
            <li className={styles.helpItem}>
              <strong>National Trust</strong>
              <span>1800-11-0031</span>
            </li>
            <li className={styles.helpNote}>
              All helplines are toll-free across India.
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottom}>
        <div className={`${styles.bottomInner} container`}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} HearWithHeart — Made with{' '}
            <Heart size={13} className={styles.heartIcon} fill="currentColor" />{' '}
            for every child who deserves a voice.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <span>·</span>
            <a href="#" className={styles.bottomLink}>Terms of Use</a>
            <span>·</span>
            <a href="#" className={styles.bottomLink}>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
