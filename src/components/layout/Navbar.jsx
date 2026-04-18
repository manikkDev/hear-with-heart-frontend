import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, LogOut, Menu, X,
  LayoutDashboard, User, ClipboardList, Trophy, BookOpen,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import LogoIcon from '../ui/LogoIcon';
import ConfirmModal from '../ui/ConfirmModal';
import styles from './Navbar.module.css';

const APP_LINKS = [
  { to: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/assessment', label: 'Assessment',  icon: ClipboardList },
  { to: '/milestones', label: 'Milestones',  icon: Trophy },
  { to: '/resources',  label: 'Resources',   icon: BookOpen },
  { to: '/profile',    label: 'Profile',     icon: User },
];

const LANDING_SECTIONS = [
  { href: '#features',  label: 'Features' },
  { href: '#how',       label: 'How It Works' },
  { href: '#research',  label: 'Research' },
];

/** Pages that should show a minimal "auth-only" navbar */
const AUTH_ONLY_PATHS = ['/register', '/login'];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* Detect scroll for navbar shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAuthOnly  = AUTH_ONLY_PATHS.includes(location.pathname);
  const isLanding   = location.pathname === '/';

  const handleLogoutConfirmed = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/');
  };

  const scrollToSection = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.inner} container`}>

          {/* ── Logo ── */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className={styles.logo}
            aria-label="HearWithHeart home"
          >
            <LogoIcon size={34} className={styles.logoIcon} />
            <span className={styles.logoText}>
              Hear<span className={styles.logoHeart}>With</span>Heart
            </span>
          </Link>

          {/* ─────── AUTH-ONLY NAVBAR (register / login) ─────── */}
          {isAuthOnly && (
            <div className={styles.authOnlyRight}>
              <button onClick={toggle} className={styles.themeBtn} aria-label="Toggle theme">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          )}

          {/* ─────── LANDING NAVBAR (unauthenticated, on /  ) ─────── */}
          {!isAuthOnly && !isAuthenticated && isLanding && (
            <>
              <nav className={`${styles.landingNav} ${mobileOpen ? styles.open : ''}`}>
                {LANDING_SECTIONS.map((s) => (
                  <button
                    key={s.href}
                    className={styles.landingLink}
                    onClick={() => scrollToSection(s.href)}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>

              <div className={styles.right}>
                <Link to="/login">
                  <button className={styles.signInBtn}>Sign In</button>
                </Link>
                <Link to="/register">
                  <button className={styles.signUpBtn}>Get Started</button>
                </Link>
                <button onClick={toggle} className={styles.themeBtn} aria-label="Toggle theme">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  className={styles.burger}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </>
          )}

          {/* ─────── UNAUTHENTICATED but NOT on landing (e.g. /login-referred) ─────── */}
          {!isAuthOnly && !isAuthenticated && !isLanding && (
            <div className={styles.right}>
              <Link to="/login"><button className={styles.signInBtn}>Sign In</button></Link>
              <Link to="/register"><button className={styles.signUpBtn}>Get Started</button></Link>
              <button onClick={toggle} className={styles.themeBtn} aria-label="Toggle theme">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          )}

          {/* ─────── APP NAVBAR (authenticated) ─────── */}
          {!isAuthOnly && isAuthenticated && (
            <>
              <nav className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}>
                {APP_LINKS.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`${styles.link} ${active ? styles.active : ''}`}
                    >
                      <link.icon size={16} />
                      <span>{link.label}</span>
                      {active && (
                        <motion.div
                          className={styles.indicator}
                          layoutId="nav-indicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className={styles.right}>
                {user?.username && (
                  <span className={styles.userLabel}>{user.username}</span>
                )}
                <button onClick={toggle} className={styles.themeBtn} aria-label="Toggle theme">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className={styles.logoutBtn}
                  title="Logout"
                >
                  <LogOut size={17} />
                  <span>Logout</span>
                </button>
                <button
                  className={styles.burger}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirmed}
        title="Sign out?"
        message="You'll need to sign in again to access your child's progress and activities."
        confirmLabel="Yes, Sign Out"
        confirmVariant="danger"
        icon={LogOut}
      />
    </>
  );
}
