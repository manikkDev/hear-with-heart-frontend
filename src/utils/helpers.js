export function normalizeCategory(cat = '') {
  const v = String(cat).trim().toLowerCase();
  if (v === 'poor' || v === 'low' || v === 'needs attention') return 'poor';
  if (v === 'average' || v === 'moderate' || v === 'good') return 'average';
  if (v === 'excellent' || v === 'high') return 'excellent';
  return 'average';
}

export function badgeVariant(cat = '') {
  const v = normalizeCategory(cat);
  if (v === 'poor') return 'warning';
  if (v === 'excellent') return 'success';
  return 'info';
}

export function getTaskCompletion(task, completed = []) {
  const ids = (task?.subtasks || []).map((s) => String(s.id || ''));
  if (!ids.length) return 0;
  const done = ids.filter((id) => completed.includes(id)).length;
  return Math.round((done / ids.length) * 100);
}

export function getOverallProgress(tasks, completed = []) {
  if (!tasks.length) return 0;
  const total = tasks.reduce((s, t) => s + getTaskCompletion(t, completed), 0);
  return Math.round(total / tasks.length);
}

export function getCompletedCount(tasks, completed = []) {
  return tasks.filter((t) => getTaskCompletion(t, completed) === 100).length;
}

export function getStreak(tasks, completed = []) {
  let streak = 0;
  for (const t of tasks) {
    if (getTaskCompletion(t, completed) === 100) streak++;
    else break;
  }
  return streak;
}

export function getDayLabel(index) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[index] || `Day ${index + 1}`;
}

export function truncate(str, len = 30) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
}

const QUOTES = [
  "Your love and patience are the strongest therapy your child can receive.",
  "Every small step is a big victory! Keep going, you're doing amazing! 🌟",
  "Progress is not always visible, but it's always happening.",
  "You are your child's greatest advocate and first teacher.",
  "Consistency, not perfection — that's the secret to growth.",
  "A parent's gentle guidance can move mountains.",
  "Celebrate every milestone, no matter how small it seems.",
  "The journey of a thousand miles begins with a single step.",
  "Your dedication today shapes your child's tomorrow.",
  "Every child blooms at their own pace. Trust the process. 🌻"
];

export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export const DISABILITY_TYPES = [
  { id: 'hearing', label: "Can't Hear", icon: 'Ear', color: '#8b5cf6' },
  { id: 'speech', label: "Can't Talk", icon: 'MessageCircleOff', color: '#ec4899' },
  { id: 'both', label: 'Both (Hearing + Speech)', icon: 'EarOff', color: '#f97316' },
  { id: 'cognitive', label: 'Cognitive Delay', icon: 'Brain', color: '#3b82f6' },
  { id: 'motor', label: 'Motor Skill Challenge', icon: 'Accessibility', color: '#10b981' },
  { id: 'socio_emotional', label: 'Socio-Emotional Need', icon: 'Heart', color: '#f43f5e' }
];

export const GOVT_SCHEMES = [
  { name: 'ADIP Scheme', desc: 'Assistance to Disabled Persons for procuring aids and appliances', url: 'https://www.disabilityaffairs.gov.in' },
  { name: 'UDID Card', desc: 'Unique Disability ID for persons with disabilities', url: 'https://www.swavlambancard.gov.in' },
  { name: 'Niramaya Health ID', desc: 'Health insurance scheme for persons with disabilities', url: 'https://thenationaltrust.gov.in' },
  { name: 'RBSK Program', desc: 'Rashtriya Bal Swasthya Karyakram – Child health screening', url: 'https://rbsk.gov.in' },
  { name: 'National Trust', desc: 'Government body supporting persons with autism, cerebral palsy, intellectual disability', url: 'https://thenationaltrust.gov.in' },
  { name: 'AYJNISHD', desc: 'Ali Yavar Jung National Institute of Speech & Hearing Disabilities, Mumbai', url: 'https://ayjnishd.nic.in' }
];

export const EXPERT_TIPS = [
  { title: "Use Everyday Objects", body: "Spoons, cups, and towels can be powerful learning tools. Let your child explore textures and sizes." },
  { title: "Follow the Child's Lead", body: "Watch what interests your child and build activities around that. Interest drives engagement." },
  { title: "Keep Sessions Short", body: "10–15 minute sessions are more effective than long exhausting ones. Quality over quantity." },
  { title: "Celebrate Small Wins", body: "Every new gesture, sound, or movement is worth celebrating. Your enthusiasm is contagious." },
  { title: "Use Visual Schedules", body: "Pictures showing the daily routine help children understand what comes next and feel secure." },
  { title: "Make Eye Contact", body: "Get to your child's eye level. This builds connection and makes communication easier." },
  { title: "Repeat, Repeat, Repeat", body: "Repetition is how children learn. Don't worry if you need to show something many times." },
  { title: "Involve Siblings", body: "Siblings can be the best teachers. Include them in activities for natural social learning." }
];
