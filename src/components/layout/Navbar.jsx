import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, LogOut, Menu, X, LayoutDashboard, User, ClipboardList, Trophy, BookOpen, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/assessment', label: 'Assessment', icon: ClipboardList },
  { to: '/milestones', label: 'Milestones', icon: Trophy },
  { to: '/resources', label: 'Resources', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: User }
];

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <Link to={isAuthenticated ? '/dashboard' : '/'} className={styles.logo}>
          <Heart size={26} className={styles.logoIcon} fill="currentColor" />
          <span className={styles.logoText}>HearWithHeart</span>
        </Link>

        {isAuthenticated && (
          <>
            <nav className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}>
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`${styles.link} ${active ? styles.active : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.icon size={17} />
                    <span>{link.label}</span>
                    {active && <motion.div className={styles.indicator} layoutId="nav-indicator" />}
                  </Link>
                );
              })}
              <button onClick={handleLogout} className={styles.link} title="Logout">
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </nav>

            <button
              className={styles.burger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}

        <button onClick={toggle} className={styles.themeBtn} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
