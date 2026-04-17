import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ClipboardList, AlertTriangle, Trophy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { fetchPrerequisiteQuestions, submitPrerequisiteResult } from '../api/client';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressRing from '../components/ui/ProgressRing';
import PageTransition from '../components/layout/PageTransition';
import styles from './Assessment.module.css';

export default function Assessment() {
  const { profile, refreshProfile, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    const supportNeed = profile?.student?.supportNeed || 'Both';
    fetchPrerequisiteQuestions(supportNeed)
      .then((data) => {
        setQuestions(data.questions || []);
        setLoaded(true);
      })
      .catch(() => toast('Could not load assessment.', 'error'));
  }, [isAuthenticated, profile, navigate, toast]);

  const select = (qId, optIdx) => setAnswers((prev) => ({ ...prev, [qId]: optIdx }));

  const handleSubmit = async () => {
    const ansArr = questions.map((q) => ({ questionId: q.id, optionIndex: answers[String(q.id)] }));
    if (ansArr.some((a) => a.optionIndex === undefined)) {
      toast('Please answer all questions.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const supportNeed = profile?.student?.supportNeed || 'Both';
      const res = await submitPrerequisiteResult(supportNeed, ansArr);
      setResult(res.result);
      await refreshProfile();
      toast('Assessment submitted!', 'success');
    } catch (err) {
      toast(err.message || 'Failed to submit.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = questions.length ? Math.round((Object.keys(answers).length / questions.length) * 100) : 0;
  const q = questions[current];

  if (result) {
    const isLow = result.category === 'Poor' || result.score <= 25;
    return (
      <PageTransition>
        <div className={`${styles.page} container`}>
          <motion.div className={styles.resultCard} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Trophy size={48} className={styles.resultIcon} />
            <h1>Assessment Complete</h1>
            <div className={styles.resultStats}>
              <div><span>Score</span><strong>{result.score}</strong></div>
              <div><span>Category</span><Badge variant={result.category === 'Excellent' ? 'success' : result.category === 'Poor' ? 'warning' : 'info'} size="lg">{result.category}</Badge></div>
            </div>
            {isLow && (
              <div className={styles.referral}>
                <AlertTriangle size={18} />
                <p>Based on the score, we gently suggest consulting a professional therapist for a detailed evaluation. Early intervention makes a huge difference.</p>
              </div>
            )}
            <p className={styles.resultNote}>Your weekly tasks are now personalized based on this assessment.</p>
            <div className={styles.resultActions}>
              <Button onClick={() => navigate('/dashboard')} icon={ChevronRight}>Go to Dashboard</Button>
              <Button variant="secondary" onClick={() => { setResult(null); setAnswers({}); setCurrent(0); }}>Retake Assessment</Button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  if (!loaded) {
    return (
      <PageTransition>
        <div className={`${styles.page} container`}>
          <div className={`skeleton ${styles.skelFull}`} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className={`${styles.page} container`}>
        <div className={styles.header}>
          <div>
            <h1><ClipboardList size={28} /> Prerequisite Assessment</h1>
            <p>Answer each question to evaluate your child's current developmental level.</p>
          </div>
          <ProgressRing progress={progress} size={64} stroke={5} />
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.progressLabel}>Question {current + 1} of {questions.length}</p>

        <AnimatePresence mode="wait">
          {q && (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <Card className={styles.questionCard}>
                <h2>{q.id}. {q.question}</h2>
                <div className={styles.options}>
                  {q.options.map((opt, idx) => {
                    const selected = answers[String(q.id)] === idx;
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.97 }}
                        className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                        onClick={() => select(String(q.id), idx)}
                      >
                        <span className={styles.optionDot}>{selected ? <Check size={14} /> : null}</span>
                        {opt.text}
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.navRow}>
          <Button variant="ghost" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} icon={ChevronLeft}>
            Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => c + 1)} icon={ChevronRight} disabled={answers[String(q?.id)] === undefined}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={submitting} icon={Check}>Submit Assessment</Button>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
