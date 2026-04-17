import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Ear, Brain, Accessibility, Users, BookOpen, ShieldCheck, Star, Sparkles } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import styles from './Landing.module.css';

const stats = [
  { num: '63M+', label: 'Children affected in India', icon: Users },
  { num: '80%', label: 'Benefit from early intervention', icon: Star },
  { num: '7', label: 'Daily guided activities', icon: BookOpen },
  { num: '100%', label: 'Free & accessible', icon: ShieldCheck }
];

const features = [
  {
    icon: Ear,
    title: 'Hearing & Speech Support',
    desc: 'Personalized activities for children with hearing or speech disabilities using everyday household items.'
  },
  {
    icon: Brain,
    title: 'Cognitive Development',
    desc: 'Age-specific tasks to enhance memory, pattern recognition, and problem-solving skills.'
  },
  {
    icon: Accessibility,
    title: 'Motor Skill Building',
    desc: 'Fun physical activities designed to improve fine and gross motor skills progressively.'
  },
  {
    icon: Heart,
    title: 'Socio-Emotional Growth',
    desc: 'Guided exercises to help your child express emotions, build confidence, and interact socially.'
  }
];

const research = [
  { cite: 'Yoshinaga-Itano, 2020', fact: 'Children diagnosed before 6 months with early intervention develop language at age-appropriate levels.' },
  { cite: 'Roberts & Kaiser, 2015', fact: 'Parent-implemented language strategies significantly improve child speech outcomes.' },
  { cite: 'Meadow-Orlans et al., 2004', fact: 'Visual supports and gestures accelerate speech learning in deaf children.' },
  { cite: 'Moeller, 2000', fact: 'Consistent parental involvement builds communication confidence and reduces anxiety.' }
];

export default function Landing() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className={styles.heroBadge}>
              <Sparkles size={14} /> Home-to-Heart Approach
            </span>
            <h1 className={styles.heroTitle}>
              Every Child Deserves a{' '}
              <span className="gradient-text">Voice</span>
            </h1>
            <p className={styles.heroSub}>
              An affordable, accessible platform helping parents support their child's cognitive, motor, and socio-emotional development at home — no expensive clinical tools needed.
            </p>
            <div className={styles.heroCta}>
              <Link to="/register">
                <Button size="lg" icon={ArrowRight}>Get Started Free</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="secondary">Sign In</Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.heroGlow} />
            <div className={styles.heroCard}>
              <div className={styles.heroEmoji}>🫶</div>
              <p>Your love and patience are the strongest therapy your child can receive.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={`${styles.statsGrid} container`}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <s.icon size={24} className={styles.statIcon} />
              <h3>{s.num}</h3>
              <p>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Supporting Every Dimension of Growth</h2>
            <p>Our platform personalizes therapy activities based on your child's unique developmental needs.</p>
          </motion.div>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <Card key={f.title} delay={i * 0.1} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <f.icon size={28} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`${styles.section} ${styles.howSection}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>How It Works</h2>
            <p>Three simple steps to start supporting your child's development today.</p>
          </motion.div>
          <div className={styles.stepsGrid}>
            {[
              { step: '01', title: 'Create Profile', desc: 'Sign up and create your child\'s profile with disability type selection and developmental background.' },
              { step: '02', title: 'Take Assessment', desc: 'Complete a quick, age-specific assessment covering cognition, motor, and socio-emotional domains.' },
              { step: '03', title: 'Start Activities', desc: 'Receive personalized weekly tasks using everyday household items. Track progress and celebrate milestones.' }
            ].map((s, i) => (
              <motion.div
                key={s.step}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <span className={styles.stepNum}>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Backed by Research</h2>
            <p>Our approach integrates findings from leading developmental studies worldwide.</p>
          </motion.div>
          <div className={styles.researchGrid}>
            {research.map((r, i) => (
              <Card key={r.cite} delay={i * 0.08} className={styles.researchCard}>
                <p className={styles.researchFact}>{r.fact}</p>
                <cite className={styles.researchCite}>— {r.cite}</cite>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>Start Your Child's Journey Today</h2>
            <p>Join hundreds of parents who are making a difference. It's completely free.</p>
            <Link to="/register">
              <Button size="lg" icon={ArrowRight}>Create Free Account</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
