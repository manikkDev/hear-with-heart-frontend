import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, User, Baby, Accessibility, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import PageTransition from '../components/layout/PageTransition';
import { DISABILITY_TYPES } from '../utils/helpers';
import * as Icons from 'lucide-react';
import styles from './Profile.module.css';

const STEPS = ['Parent Details', 'Child Details', 'Support Needs'];

export default function Profile() {
  const { profile, saveProfile, refreshProfile, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isFresh = params.has('fresh');

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState(!isFresh && Boolean(profile?.parent?.name));

  const [parent, setParent] = useState({
    name: '', age: '', phone: '', relation: '', address: '', state: ''
  });
  const [student, setStudent] = useState({
    name: '', age: '', school: '', grade: '', gender: '', supportNeed: '', hobbies: ''
  });
  const [disabilityTypes, setDisabilityTypes] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (profile) {
      setParent((p) => ({
        name: profile.parent?.name || p.name,
        age: profile.parent?.age || p.age,
        phone: profile.parent?.phone || p.phone,
        relation: profile.parent?.relation || p.relation,
        address: profile.parent?.address || p.address,
        state: profile.parent?.state || p.state
      }));
      setStudent((s) => ({
        name: profile.student?.name || s.name,
        age: profile.student?.age || s.age,
        school: profile.student?.school || s.school,
        grade: profile.student?.grade || s.grade,
        gender: profile.student?.gender || s.gender,
        supportNeed: profile.student?.supportNeed || s.supportNeed,
        hobbies: profile.student?.hobbies || s.hobbies
      }));
      if (profile.disabilityTypes) setDisabilityTypes(profile.disabilityTypes);
      if (!isFresh && profile.parent?.name) setViewMode(true);
    }
  }, [profile, isAuthenticated, navigate, isFresh]);

  const pField = (key, val) => setParent((p) => ({ ...p, [key]: val }));
  const sField = (key, val) => setStudent((s) => ({ ...s, [key]: val }));

  const toggleDisability = (id) => {
    setDisabilityTypes((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!parent.name || !parent.phone || !student.name || !student.age) {
      toast('Please fill all required fields.', 'error');
      return;
    }
    const supportNeed = disabilityTypes.length > 0
      ? disabilityTypes.includes('both') ? 'Both'
        : disabilityTypes.includes('hearing') ? "Can't Hear"
        : disabilityTypes.includes('speech') ? "Can't Talk"
        : 'Both'
      : student.supportNeed || 'Both';

    setSaving(true);
    try {
      await saveProfile({ parent, student: { ...student, supportNeed }, disabilityTypes });
      toast('Profile saved!', 'success');
      setViewMode(true);
    } catch (err) {
      toast(err.message || 'Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const goAssessment = () => navigate('/assessment');

  if (viewMode) {
    return (
      <PageTransition>
        <div className={`${styles.page} container`}>
          <div className={styles.viewHeader}>
            <h1>Family Profile</h1>
            <Button variant="secondary" icon={Save} onClick={() => { setViewMode(false); setStep(0); }}>
              Edit Profile
            </Button>
          </div>

          <div className={styles.viewGrid}>
            <Card className={styles.viewCard} delay={0}>
              <h3><User size={18} /> Parent / Guardian</h3>
              <div className={styles.infoGrid}>
                {Object.entries(parent).filter(([,v]) => v).map(([k, v]) => (
                  <div key={k} className={styles.infoItem}>
                    <span className={styles.infoLabel}>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                    <span className={styles.infoValue}>{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={styles.viewCard} delay={0.1}>
              <h3><Baby size={18} /> Child Details</h3>
              <div className={styles.infoGrid}>
                {Object.entries(student).filter(([,v]) => v).map(([k, v]) => (
                  <div key={k} className={styles.infoItem}>
                    <span className={styles.infoLabel}>{k === 'supportNeed' ? 'Support Need' : k.charAt(0).toUpperCase() + k.slice(1)}</span>
                    <span className={styles.infoValue}>{v}</span>
                  </div>
                ))}
              </div>
              {disabilityTypes.length > 0 && (
                <div className={styles.badgeRow}>
                  {disabilityTypes.map((id) => {
                    const dt = DISABILITY_TYPES.find((d) => d.id === id);
                    return dt ? <Badge key={id} variant="primary">{dt.label}</Badge> : null;
                  })}
                </div>
              )}
            </Card>
          </div>

          {profile?.prerequisite?.category && (
            <Card variant="primary" delay={0.2} className={styles.assessmentCard}>
              <h3>Assessment Result</h3>
              <p>Category: <strong>{profile.prerequisite.category}</strong> — Score: <strong>{profile.prerequisite.score}</strong></p>
            </Card>
          )}

          <div className={styles.viewActions}>
            <Button onClick={goAssessment} icon={ChevronRight}>
              {profile?.prerequisite?.category ? 'Retake Assessment' : 'Take Assessment'}
            </Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className={`${styles.page} container`}>
        {/* Step Indicators */}
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s} className={`${styles.step} ${i <= step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}>
              <div className={styles.stepDot}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="parent" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className={styles.formCard}>
                <h2><User size={22} /> Parent / Guardian Details</h2>
                <div className={styles.grid}>
                  <label className={styles.field}><span>Full Name *</span>
                    <input value={parent.name} onChange={(e) => pField('name', e.target.value)} placeholder="Enter full name" required />
                  </label>
                  <label className={styles.field}><span>Age *</span>
                    <input type="number" min={18} max={100} value={parent.age} onChange={(e) => pField('age', e.target.value)} placeholder="Age" />
                  </label>
                  <label className={styles.field}><span>Phone *</span>
                    <input value={parent.phone} onChange={(e) => pField('phone', e.target.value)} placeholder="Phone number" />
                  </label>
                  <label className={styles.field}><span>Relation *</span>
                    <select value={parent.relation} onChange={(e) => pField('relation', e.target.value)}>
                      <option value="">Select</option>
                      {['Mother','Father','Sister','Brother','Grandfather','Grandmother','Other'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </label>
                  <label className={`${styles.field} ${styles.fieldWide}`}><span>Address</span>
                    <input value={parent.address} onChange={(e) => pField('address', e.target.value)} placeholder="Complete address" />
                  </label>
                  <label className={styles.field}><span>State</span>
                    <input value={parent.state} onChange={(e) => pField('state', e.target.value)} placeholder="State" />
                  </label>
                </div>
                <div className={styles.nav}>
                  <div />
                  <Button onClick={() => setStep(1)} icon={ChevronRight}>Next</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="child" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className={styles.formCard}>
                <h2><Baby size={22} /> Child Details</h2>
                <div className={styles.grid}>
                  <label className={styles.field}><span>Full Name *</span>
                    <input value={student.name} onChange={(e) => sField('name', e.target.value)} placeholder="Child's full name" required />
                  </label>
                  <label className={styles.field}><span>Age *</span>
                    <input type="number" min={1} max={25} value={student.age} onChange={(e) => sField('age', e.target.value)} placeholder="Age" />
                  </label>
                  <label className={styles.field}><span>School / Institute</span>
                    <input value={student.school} onChange={(e) => sField('school', e.target.value)} placeholder="School name" />
                  </label>
                  <label className={styles.field}><span>Grade / Class</span>
                    <input value={student.grade} onChange={(e) => sField('grade', e.target.value)} placeholder="e.g. LKG, Grade 3" />
                  </label>
                  <label className={styles.field}><span>Gender</span>
                    <select value={student.gender} onChange={(e) => sField('gender', e.target.value)}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label className={styles.field}><span>Hobbies</span>
                    <input value={student.hobbies} onChange={(e) => sField('hobbies', e.target.value)} placeholder="Reading, sports, music..." />
                  </label>
                </div>
                <div className={styles.nav}>
                  <Button variant="ghost" onClick={() => setStep(0)} icon={ChevronLeft}>Back</Button>
                  <Button onClick={() => setStep(2)} icon={ChevronRight}>Next</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="disability" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className={styles.formCard}>
                <h2><Accessibility size={22} /> Support Needs</h2>
                <p className={styles.hint}>Select all disability types that apply to your child.</p>
                <div className={styles.disabilityGrid}>
                  {DISABILITY_TYPES.map((dt) => {
                    const IconComp = Icons[dt.icon] || Accessibility;
                    const selected = disabilityTypes.includes(dt.id);
                    return (
                      <motion.button
                        key={dt.id}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.disabilityCard} ${selected ? styles.disabilitySelected : ''}`}
                        style={{ '--dt-color': dt.color }}
                        onClick={() => toggleDisability(dt.id)}
                      >
                        <IconComp size={28} />
                        <span>{dt.label}</span>
                        {selected && <Check size={16} className={styles.disabilityCheck} />}
                      </motion.button>
                    );
                  })}
                </div>
                <div className={styles.nav}>
                  <Button variant="ghost" onClick={() => setStep(1)} icon={ChevronLeft}>Back</Button>
                  <Button onClick={handleSave} loading={saving} icon={Check}>Save Profile</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
