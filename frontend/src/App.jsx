import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  FileText,
  ShieldCheck,
  Target,
  BrainCircuit,
  MessageSquareCode,
  Wand2,
  Map,
  Briefcase,
  LayoutDashboard,
  UserCheck,
  Settings,
  Sun,
  Moon,
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Menu,
  X,
  Download,
  RefreshCw,
  Clock,
  Award,
  TrendingUp,
  Layers,
  Code2,
  Database,
  Cpu,
  Globe,
  Bookmark,
  BookmarkCheck,
  Play,
  Send,
  Edit3,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Sliders,
  Info,
  LogOut,
  Lock,
  Mail,
  GraduationCap,
  Building2,
  Calendar,
  Zap,
  BarChart3,
  ListChecks,
  BookOpen
} from 'lucide-react';

// ============================================================================
// 1. CLIENT-SIDE NLP, RESUME PARSING & SCORING ENGINE
// ============================================================================

const SKILL_TAXONOMY = {
  Programming: ['python', 'java', 'c++', 'javascript', 'typescript', 'c', 'go', 'rust', 'r', 'bash'],
  'Data Structures & Algorithms': ['data structures', 'algorithms', 'dsa', 'oop', 'object oriented', 'dynamic programming', 'trees', 'graphs', 'problem solving'],
  'Machine Learning': ['machine learning', 'scikit-learn', 'sklearn', 'regression', 'classification', 'random forest', 'xgboost', 'feature engineering', 'pandas', 'numpy', 'statistics'],
  'Deep Learning & NLP': ['deep learning', 'tensorflow', 'pytorch', 'keras', 'nlp', 'natural language processing', 'transformers', 'bert', 'llm', 'computer vision', 'opencv', 'neural networks'],
  'Web & Backend': ['react', 'node.js', 'fastapi', 'flask', 'django', 'rest api', 'html', 'css', 'tailwind', 'express', 'next.js', 'spring boot'],
  'Database & Cloud': ['sql', 'postgresql', 'mysql', 'mongodb', 'sqlite', 'docker', 'git', 'github', 'aws', 'linux', 'ci/cd']
};

const ALL_KNOWN_SKILLS = Object.values(SKILL_TAXONOMY).flat();

const ROLE_PROFILES = {
  'AI/ML Engineer': {
    required: ['python', 'machine learning', 'deep learning', 'tensorflow', 'sql', 'nlp', 'statistics', 'pandas', 'numpy', 'git'],
    preferred: ['pytorch', 'docker', 'fastapi', 'transformers', 'scikit-learn', 'data structures', 'algorithms'],
    description: `Role: Junior AI/ML Engineer
Responsibilities:
- Design, train, and evaluate machine learning and deep learning models using Python, TensorFlow, and PyTorch.
- Build end-to-end NLP pipelines, feature engineering workflows, and REST APIs using FastAPI.
- Collaborate on data preprocessing with Pandas, NumPy, and SQL databases.
- Apply strong statistics, probability, data structures, and algorithms knowledge to optimize model inference.
Requirements:
- B.Tech/B.E. in Computer Science, AI, or related field.
- Hands-on projects in Machine Learning, NLP, or Computer Vision with Git version control.`
  },
  'Full-Stack Software Engineer': {
    required: ['javascript', 'typescript', 'react', 'node.js', 'sql', 'rest api', 'git', 'data structures', 'algorithms', 'html', 'css'],
    preferred: ['next.js', 'postgresql', 'mongodb', 'docker', 'tailwind', 'python', 'oop'],
    description: `Role: Software Development Engineer (Full-Stack)
Responsibilities:
- Develop responsive, accessible frontend web applications using React, TypeScript, and Tailwind CSS.
- Architect scalable backend REST APIs with Node.js or Python FastAPI and relational databases (PostgreSQL / SQL).
- Write clean, testable code grounded in OOP, Data Structures, and Algorithms.
Requirements:
- Strong proficiency in JavaScript/TypeScript, React, SQL, and Git workflows.`
  },
  'Java Backend Developer': {
    required: ['java', 'oop', 'data structures', 'algorithms', 'sql', 'spring boot', 'rest api', 'git', 'mysql'],
    preferred: ['docker', 'mongodb', 'linux', 'problem solving', 'postgresql'],
    description: `Role: Associate Java Backend Developer
Responsibilities:
- Build high-throughput microservices and REST APIs using Java and Spring Boot.
- Design normalized relational database schemas in MySQL/PostgreSQL and optimize SQL queries.
- Apply strong Object-Oriented Programming (OOP), Data Structures, and Algorithms principles.
Requirements:
- Solid command of Core Java, Collections, Multithreading, SQL, and Git.`
  },
  'Data Analyst': {
    required: ['python', 'sql', 'pandas', 'numpy', 'statistics', 'data analysis', 'excel', 'mysql'],
    preferred: ['machine learning', 'scikit-learn', 'postgresql', 'git', 'r'],
    description: `Role: Junior Data Analyst
Responsibilities:
- Extract, clean, and transform large datasets using SQL, Python, Pandas, and NumPy.
- Perform statistical analysis, hypothesis testing, and KPI dashboarding to drive business decisions.
Requirements:
- Strong SQL querying, Python data manipulation, and applied statistics foundation.`
  }
};

const SAMPLE_RESUME_TEXT = `AARAV SHARMA
aarav.sharma.ai@gmail.com | +91-9876543210 | linkedin.com/in/aarav-sharma-ai | github.com/aarav-ml

OBJECTIVE
Final-year B.Tech CSE (Artificial Intelligence) student passionate about building scalable Machine Learning, NLP, and full-stack AI applications. Seeking an AI/ML Engineer or Software Development role.

EDUCATION
B.Tech in Computer Science & Engineering (Artificial Intelligence) — RGPV University (2023 – 2027)
CGPA: 8.6 / 10.0

TECHNICAL SKILLS
Programming Languages: Python, Java, C++, JavaScript, SQL
AI / ML & NLP: Machine Learning, Scikit-learn, Pandas, NumPy, NLP, NLTK, HuggingFace Basics
Web & Tools: FastAPI, React, HTML, CSS, Git, GitHub, PostgreSQL, Linux

PROJECTS
1. SmartDoc AI — Intelligent Document Q&A System
- Made a web app using Python and FastAPI that lets users upload PDF notes and ask questions.
- Used NLP embeddings and cosine similarity to retrieve relevant paragraphs.
- Built frontend interface in React for clean reading.

2. Student Placement Predictor & Analytics Dashboard
- Built a machine learning classification model using Scikit-learn and Random Forest on academic records.
- Performed data cleaning with Pandas and NumPy, achieving 84% validation accuracy.

3. E-Commerce REST API Backend
- Developed backend APIs using Java and SQL with user authentication and product catalog endpoints.

INTERNSHIP EXPERIENCE
AI & Data Science Intern — TechNova Labs (May 2025 – July 2025)
- Worked on text classification datasets using Python and Scikit-learn.
- Assisted senior engineers in writing SQL queries and testing REST API endpoints.

CERTIFICATIONS & ACHIEVEMENTS
- Machine Learning Specialization — Coursera (Andrew Ng)
- Solved 250+ Data Structures and Algorithms problems on LeetCode & GeeksforGeeks
- Winner, Smart India Hackathon Internal Campus Round 2025`;

const SAMPLE_JOBS = [
  {
    id: 'job-1',
    title: 'Junior AI / Machine Learning Engineer',
    company: 'NeuroScale Technologies',
    location: 'Bengaluru, India (Hybrid)',
    type: 'Full-Time',
    experience: 'Fresher / 0-1 Yrs',
    salary: '₹8.5 – 12 LPA',
    posted: '2 days ago',
    skills: ['python', 'machine learning', 'nlp', 'tensorflow', 'sql', 'fastapi', 'git'],
    description: 'Build production NLP & predictive ML services using Python, FastAPI, TensorFlow, and PostgreSQL. Ideal for B.Tech CS/AI graduates with strong project portfolios.'
  },
  {
    id: 'job-2',
    title: 'Software Development Engineer – I (Backend & AI)',
    company: 'CloudPulse Systems',
    location: 'Pune, India (Remote)',
    type: 'Full-Time',
    experience: 'Fresher (2026/2027 Batch)',
    salary: '₹9.0 – 14 LPA',
    posted: '3 days ago',
    skills: ['python', 'java', 'data structures', 'algorithms', 'sql', 'rest api', 'docker', 'git'],
    description: 'Develop scalable backend microservices, optimize SQL databases, and integrate LLM APIs into enterprise workflows.'
  },
  {
    id: 'job-3',
    title: 'Machine Learning & NLP Intern',
    company: 'VedaAI Research Labs',
    location: 'Hyderabad, India',
    type: 'Internship',
    experience: 'Student / Pre-Final Year',
    salary: '₹35,000 / month',
    posted: '1 day ago',
    skills: ['python', 'machine learning', 'deep learning', 'nlp', 'pytorch', 'pandas', 'numpy'],
    description: 'Work alongside applied scientists on transformer fine-tuning, document parsing, and semantic search benchmarks.'
  },
  {
    id: 'job-4',
    title: 'Associate Full-Stack Developer (React + Python)',
    company: 'FinStack Digital',
    location: 'Gurugram, India (Hybrid)',
    type: 'Full-Time',
    experience: '0-1 Yrs',
    salary: '₹7.5 – 10.5 LPA',
    posted: '5 days ago',
    skills: ['javascript', 'react', 'python', 'fastapi', 'sql', 'html', 'css', 'git'],
    description: 'Create high-craft SaaS analytics dashboards in React and connect them with high-speed Python FastAPI microservices.'
  },
  {
    id: 'job-5',
    title: 'Data Science & Analytics Trainee',
    company: 'MetricFlow Analytics',
    location: 'Mumbai, India',
    type: 'Internship',
    experience: 'Fresher',
    salary: '₹28,000 / month',
    posted: '4 days ago',
    skills: ['python', 'sql', 'pandas', 'numpy', 'statistics', 'machine learning', 'scikit-learn'],
    description: 'Analyze product funnels, build statistical forecasting models, and automate SQL reporting pipelines.'
  },
  {
    id: 'job-6',
    title: 'Java Software Engineer (Graduate Trainee)',
    company: 'CoreBank Tech Solutions',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    experience: 'Fresher',
    salary: '₹8.0 – 11 LPA',
    posted: '6 days ago',
    skills: ['java', 'oop', 'data structures', 'algorithms', 'sql', 'spring boot', 'mysql', 'git'],
    description: 'Design resilient core banking APIs using Java, Spring Boot, OOP design patterns, and relational SQL databases.'
  }
];

const INTERVIEW_QUESTION_BANK = [
  {
    id: 'q1',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    question: 'What is the difference between L1 (Lasso) and L2 (Ridge) regularization, and when would you prefer one over the other?',
    keywords: ['overfitting', 'penalty', 'sparse', 'feature selection', 'zero', 'weights', 'l1', 'l2', 'shrink'],
    idealAnswer: 'Both L1 and L2 regularization prevent overfitting by adding a penalty term to the loss function based on model weights. L1 (Lasso) adds the absolute value of weights (λ∑|w|), which drives less important feature weights to exact zero—performing automatic feature selection and creating sparse models. L2 (Ridge) adds the squared magnitude of weights (λ∑w²), shrinking weights evenly toward zero without eliminating them, which works better when most features contribute small effects or are correlated.'
  },
  {
    id: 'q2',
    category: 'NLP & AI',
    difficulty: 'Intermediate',
    question: 'How does TF-IDF differ from dense embeddings (like Sentence Transformers) when matching a resume to a job description?',
    keywords: ['frequency', 'exact', 'keyword', 'semantic', 'context', 'vector', 'cosine', 'synonym', 'meaning'],
    idealAnswer: 'TF-IDF (Term Frequency–Inverse Document Frequency) creates sparse statistical vectors based on exact word frequencies, rewarding rare keywords but missing synonyms (e.g., "ML" vs "Machine Learning"). Dense embeddings generated by Sentence Transformers map sentences into continuous vector spaces that capture semantic meaning and context, allowing cosine similarity to match conceptually related skills even when exact words differ.'
  },
  {
    id: 'q3',
    category: 'DSA',
    difficulty: 'Beginner',
    question: 'Explain how a HashMap works internally and what happens during a hash collision.',
    keywords: ['hash', 'bucket', 'key', 'value', 'collision', 'linked list', 'tree', 'o(1)', 'equals', 'hashcode'],
    idealAnswer: 'A HashMap stores key-value pairs in an array of buckets indexed by computing hashCode() on the key and mapping it to an array index. On average, lookup and insertion take O(1) time. When two distinct keys produce the same bucket index (a hash collision), they are stored in that bucket using a Linked List (chaining), which converts into a balanced Red-Black Tree once bucket size exceeds a threshold (e.g., 8 in Java 8+) to guarantee O(log n) worst-case lookup.'
  },
  {
    id: 'q4',
    category: 'Core CS (OOP/DBMS)',
    difficulty: 'Beginner',
    question: 'Explain the four pillars of Object-Oriented Programming with practical examples.',
    keywords: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'private', 'class', 'override', 'interface'],
    idealAnswer: 'The four pillars of OOP are: 1) Encapsulation: bundling data and methods inside a class and restricting direct access via private fields and getters/setters. 2) Abstraction: hiding complex implementation details and exposing only essential interfaces (e.g., abstract classes/interfaces). 3) Inheritance: allowing a child class to reuse and extend properties/methods of a parent class. 4) Polymorphism: enabling a single interface or method name to behave differently via compile-time overloading or runtime method overriding.'
  },
  {
    id: 'q5',
    category: 'DBMS & SQL',
    difficulty: 'Intermediate',
    question: 'What is database normalization (1NF, 2NF, 3NF), and why might we intentionally denormalize in analytics systems?',
    keywords: ['redundancy', 'anomaly', 'primary key', 'transitive', 'dependency', 'join', 'performance', 'read', '1nf', '3nf'],
    idealAnswer: 'Normalization structures relational tables to eliminate data redundancy and update/insert/delete anomalies: 1NF ensures atomic columns, 2NF removes partial dependencies on composite keys, and 3NF removes transitive dependencies on non-key attributes. In read-heavy analytics or data warehouses, we sometimes denormalize (combine tables) to avoid expensive multi-table JOINs and speed up analytical query latency.'
  },
  {
    id: 'q6',
    category: 'Project-Based',
    difficulty: 'Intermediate',
    question: 'Walk me through your most impactful technical project: what problem did it solve, what architecture did you choose, and how did you measure success?',
    keywords: ['architecture', 'problem', 'latency', 'accuracy', 'database', 'api', 'tradeoff', 'metric', 'user'],
    idealAnswer: 'A strong answer follows the STAR/Architecture structure: 1) Problem statement & target user pain point. 2) System architecture (frontend, backend API, ML/NLP pipeline, database choice and why). 3) Key engineering challenge solved (e.g., handling noisy PDF extraction or reducing latency). 4) Quantitative metrics achieved (e.g., accuracy, response time, or test coverage) and future improvements.'
  },
  {
    id: 'q7',
    category: 'HR & Behavioral',
    difficulty: 'Beginner',
    question: 'Tell me about a time you had to quickly learn a new technology or debug a difficult issue under a tight deadline.',
    keywords: ['deadline', 'debug', 'isolate', 'documentation', 'root cause', 'learned', 'outcome', 'collaborate'],
    idealAnswer: 'Use the STAR method: Describe the Situation and tight timeline, the Task you owned, the systematic Actions you took (isolating variables, reading official documentation, building a minimal reproduction, testing edge cases), and the positive Result with lessons applied to future work.'
  }
];

// Parse raw resume text into structured intelligence
function analyzeResumeText(rawText) {
  const text = (rawText || '').trim();
  const lower = text.toLowerCase();
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // Extract contact details
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
  const githubMatch = text.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);

  const candidateName = lines[0] && lines[0].length < 45 && !lines[0].includes('@')
    ? lines[0]
    : 'Candidate Profile';

  // Detect sections
  const sectionsDetected = {
    contact: Boolean(emailMatch || phoneMatch),
    education: /\b(education|university|college|b\.tech|b\.e\.|bachelor|cgpa|gpa)\b/i.test(text),
    skills: /\b(skills|technologies|technical skills|programming languages)\b/i.test(text),
    projects: /\b(projects|academic projects|personal projects)\b/i.test(text),
    experience: /\b(experience|internship|intern|employment|work history)\b/i.test(text),
    certifications: /\b(certifications|achievements|awards|hackathon|coursera)\b/i.test(text)
  };

  // Extract skills grouped by category
  const extractedSkills = [];
  const skillsByCategory = {};
  Object.entries(SKILL_TAXONOMY).forEach(([cat, skills]) => {
    const found = skills.filter(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
      return regex.test(lower);
    });
    if (found.length > 0) {
      skillsByCategory[cat] = found;
      found.forEach(f => {
        if (!extractedSkills.includes(f)) extractedSkills.push(f);
      });
    }
  });

  // Extract bullet points & evaluate quantification / action verbs
  const bullets = lines.filter(l => /^[-•*]\s+/.test(l));
  const actionVerbs = ['developed', 'built', 'designed', 'engineered', 'implemented', 'optimized', 'trained', 'architected', 'deployed', 'automated', 'analyzed', 'achieved', 'reduced', 'improved'];
  const strongBullets = bullets.filter(b => {
    const bl = b.toLowerCase();
    return actionVerbs.some(v => bl.includes(v));
  });
  const quantifiedBullets = bullets.filter(b => /\d+%|\d+\+|\d+x|\$\d+|₹\d+|\d+\s*(ms|sec|users|problems|records)/i.test(b));

  // Sub-scores
  const techScore = Math.min(96, Math.max(35, 42 + extractedSkills.length * 3.2));
  const projectScore = sectionsDetected.projects
    ? Math.min(95, 58 + bullets.length * 4 + quantifiedBullets.length * 6)
    : 35;
  const eduScore = sectionsDetected.education ? (/\b(cgpa|gpa|8\.|9\.)/i.test(text) ? 90 : 80) : 40;
  const expScore = sectionsDetected.experience ? Math.min(92, 68 + quantifiedBullets.length * 6) : 48;
  const formatScore = Math.min(
    95,
    45 +
      Object.values(sectionsDetected).filter(Boolean).length * 7 +
      (bullets.length >= 3 ? 8 : 0)
  );

  const overallScore = Math.round(
    techScore * 0.28 +
    projectScore * 0.24 +
    eduScore * 0.16 +
    expScore * 0.16 +
    formatScore * 0.16
  );

  // Actionable AI suggestions
  const strengths = [];
  const weaknesses = [];
  const priorityImprovements = [];

  if (extractedSkills.length >= 8) {
    strengths.push(`Strong technical breadth with ${extractedSkills.length} recognized industry skills across multiple domains.`);
  }
  if (sectionsDetected.education && sectionsDetected.projects) {
    strengths.push('Clear core academic and project hierarchy suitable for campus & fresher screening.');
  }
  if (githubMatch) {
    strengths.push(`Includes verifiable code portfolio link (${githubMatch[0]}).`);
  }
  if (strengths.length === 0) {
    strengths.push('Clean readable text structure ready for iterative keyword enrichment.');
  }

  if (quantifiedBullets.length < 2) {
    weaknesses.push(`Only ${quantifiedBullets.length} bullet point(s) contain measurable metrics (%, latency, accuracy, or scale).`);
    priorityImprovements.push('Quantify project and internship impact (e.g., "Improved inference speed by 32%" or "Evaluated on 10,000+ records").');
  }
  if (bullets.some(b => /^[-•*]\s*(made|worked on|assisted|helped)/i.test(b))) {
    weaknesses.push('Passive starter verbs detected ("Made a...", "Worked on...") that undersell engineering ownership.');
    priorityImprovements.push('Replace passive openers in AI Resume Writer with strong engineering verbs like Engineered, Architected, or Automated.');
  }
  if (!githubMatch) {
    weaknesses.push('Missing GitHub or live project repository URL in the header.');
    priorityImprovements.push('Add GitHub and LinkedIn profile URLs in the contact header for technical recruiter verification.');
  }
  if (!sectionsDetected.certifications) {
    weaknesses.push('No dedicated Certifications or Hackathon Achievements section detected.');
    priorityImprovements.push('Include verified certifications, competitive coding ratings, or hackathon milestones.');
  }

  return {
    candidateName,
    email: emailMatch ? emailMatch[0] : 'Not detected',
    phone: phoneMatch ? phoneMatch[0] : 'Not detected',
    linkedin: linkedinMatch ? linkedinMatch[0] : 'Not detected',
    github: githubMatch ? githubMatch[0] : 'Not detected',
    wordCount: text.split(/\s+/).filter(Boolean).length,
    bulletCount: bullets.length,
    quantifiedCount: quantifiedBullets.length,
    strongBulletCount: strongBullets.length,
    sectionsDetected,
    extractedSkills,
    skillsByCategory,
    bullets,
    scores: {
      overall: overallScore,
      technical: Math.round(techScore),
      projects: Math.round(projectScore),
      education: Math.round(eduScore),
      experience: Math.round(expScore),
      formatting: Math.round(formatScore)
    },
    strengths,
    weaknesses,
    priorityImprovements
  };
}

// Compute TF-IDF + Skill Match between Resume and Job Description
function computeJobMatch(resumeText, jdText, targetRoleName) {
  const resAnalysis = analyzeResumeText(resumeText);
  const resSkills = new Set(resAnalysis.extractedSkills.map(s => s.toLowerCase()));
  const jdLower = (jdText || '').toLowerCase();

  // Extract skills mentioned in JD
  const jdSkills = ALL_KNOWN_SKILLS.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    return regex.test(jdLower);
  });

  const activeJdSkills = jdSkills.length > 0
    ? Array.from(new Set(jdSkills))
    : (ROLE_PROFILES[targetRoleName]?.required || ['python', 'sql', 'git', 'data structures']);

  const matchedSkills = activeJdSkills.filter(s => resSkills.has(s));
  const missingSkills = activeJdSkills.filter(s => !resSkills.has(s));

  // Related skills (skills in same category as missing skills that user possesses)
  const relatedSkills = [];
  missingSkills.forEach(ms => {
    const catEntry = Object.entries(SKILL_TAXONOMY).find(([, list]) => list.includes(ms));
    if (catEntry) {
      const userPeers = catEntry[1].filter(s => resSkills.has(s) && !matchedSkills.includes(s));
      userPeers.forEach(p => {
        if (!relatedSkills.includes(p)) relatedSkills.push(p);
      });
    }
  });

  // Token cosine / TF overlap on non-stopword terms
  const stopwords = new Set(['the', 'and', 'for', 'with', 'using', 'in', 'to', 'of', 'a', 'an', 'on', 'or', 'as', 'is', 'are', 'role', 'requirements', 'responsibilities']);
  const tokenize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopwords.has(w));

  const resTokens = new Set(tokenize(resumeText));
  const jdTokens = Array.from(new Set(tokenize(jdText)));
  const tokenOverlap = jdTokens.length > 0
    ? jdTokens.filter(t => resTokens.has(t)).length / jdTokens.length
    : 0.5;

  const skillRatio = activeJdSkills.length > 0 ? matchedSkills.length / activeJdSkills.length : 0.6;
  const semanticBonus = relatedSkills.length > 0 ? Math.min(0.1, relatedSkills.length * 0.03) : 0;

  const overallMatch = Math.min(
    98,
    Math.max(24, Math.round((skillRatio * 0.68 + tokenOverlap * 0.22 + semanticBonus + 0.05) * 100))
  );

  return {
    overallMatch,
    keywordSimilarity: Math.round(tokenOverlap * 100),
    skillMatchRate: Math.round(skillRatio * 100),
    matchedSkills,
    missingSkills,
    relatedSkills,
    educationRelevance: resAnalysis.sectionsDetected.education ? 'High (CS/Technical Degree Aligned)' : 'Moderate (Add Degree Details)',
    experienceRelevance: resAnalysis.sectionsDetected.experience ? 'Strong (Internship & Project Evidence)' : 'Entry-Level (Project Portfolio Driven)'
  };
}

// ============================================================================
// 2. REUSABLE UI COMPONENTS (CIRCULAR GAUGES, BADGES, TOASTS)
// ============================================================================

function CircularGauge({ value, size = 112, strokeWidth = 9, color = '#8B5CF6', label, sublabel, darkMode }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value || 0));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 transform">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={darkMode ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.08)'}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {clamped}%
          </span>
          {sublabel && (
            <span className={`text-[10px] font-medium uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {sublabel}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className={`mt-2 text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {label}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent Theme & Navigation State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cp_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'app'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [globalSearch, setGlobalSearch] = useState('');
  const [toast, setToast] = useState(null);

  // User Profile State (Pre-populated with realistic CS-AI student profile)
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('cp_user_profile');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Aarav Sharma',
          email: 'aarav.sharma.ai@gmail.com',
          college: 'RGPV Institute of Technology',
          degree: 'B.Tech',
          branch: 'CSE – Artificial Intelligence',
          graduationYear: '2027',
          experienceLevel: 'Fresher (Internship Exp.)',
          targetRole: 'AI/ML Engineer',
          dailyStudyHours: 2.5,
          skills: ['Python', 'Java', 'Machine Learning', 'SQL', 'NLP', 'FastAPI', 'React', 'Git']
        };
  });

  // Active Resume Text State
  const [resumeText, setResumeText] = useState(() => {
    return localStorage.getItem('cp_resume_text') || SAMPLE_RESUME_TEXT;
  });
  const [resumeFileName, setResumeFileName] = useState(() => {
    return localStorage.getItem('cp_resume_filename') || 'Aarav_Sharma_CS_AI_Resume.pdf';
  });

  // Job Matcher State
  const [selectedRolePreset, setSelectedRolePreset] = useState('AI/ML Engineer');
  const [customJdText, setCustomJdText] = useState(ROLE_PROFILES['AI/ML Engineer'].description);
  const [targetCompany, setTargetCompany] = useState('Google / Tier-1 AI Product');

  // Skill Gap Progress State
  const [skillStatuses, setSkillStatuses] = useState(() => {
    const saved = localStorage.getItem('cp_skill_statuses');
    return saved
      ? JSON.parse(saved)
      : {
          python: 'Completed',
          'machine learning': 'Intermediate',
          sql: 'Intermediate',
          nlp: 'Intermediate',
          'deep learning': 'Learning',
          tensorflow: 'Not Started',
          statistics: 'Learning',
          docker: 'Not Started',
          'data structures': 'Intermediate',
          algorithms: 'Learning'
        };
  });

  // Career Roadmap Checklist State
  const [roadmapDuration, setRoadmapDuration] = useState('30-Day');
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('cp_roadmap_tasks');
    return saved
      ? JSON.parse(saved)
      : {
          'w1-1': true,
          'w1-2': true,
          'w1-3': false,
          'w2-1': true,
          'w2-2': false,
          'w2-3': false,
          'w3-1': false,
          'w3-2': false,
          'w3-3': false,
          'w4-1': false,
          'w4-2': false,
          'w4-3': false
        };
  });

  // Saved & Tracked Jobs State
  const [jobApplications, setJobApplications] = useState(() => {
    const saved = localStorage.getItem('cp_job_apps');
    return saved
      ? JSON.parse(saved)
      : {
          'job-1': 'Saved',
          'job-3': 'Applied'
        };
  });

  // Interview Lab History State
  const [interviewHistory, setInterviewHistory] = useState(() => {
    const saved = localStorage.getItem('cp_interview_history');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'int-101',
            date: 'Nov 16, 2026',
            category: 'Machine Learning',
            score: 8.2,
            questionsCount: 3,
            summary: 'Strong grasp of bias-variance & regularization; expand on precision-recall tradeoffs.'
          },
          {
            id: 'int-102',
            date: 'Nov 17, 2026',
            category: 'Core CS & DSA',
            score: 7.5,
            questionsCount: 3,
            summary: 'Clear OOP explanation; practice time-complexity edge cases for HashMap collisions.'
          }
        ];
  });

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem('cp_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('cp_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('cp_resume_text', resumeText);
    localStorage.setItem('cp_resume_filename', resumeFileName);
  }, [resumeText, resumeFileName]);

  useEffect(() => {
    localStorage.setItem('cp_skill_statuses', JSON.stringify(skillStatuses));
  }, [skillStatuses]);

  useEffect(() => {
    localStorage.setItem('cp_roadmap_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('cp_job_apps', JSON.stringify(jobApplications));
  }, [jobApplications]);

  useEffect(() => {
    localStorage.setItem('cp_interview_history', JSON.stringify(interviewHistory));
  }, [interviewHistory]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3400);
  };

  // Real-time Computed Intelligence Metrics across all modules
  const resumeAnalysis = useMemo(() => analyzeResumeText(resumeText), [resumeText]);
  const jobMatchReport = useMemo(
    () => computeJobMatch(resumeText, customJdText, selectedRolePreset),
    [resumeText, customJdText, selectedRolePreset]
  );

  // Estimated ATS Compatibility Score
  const atsReport = useMemo(() => {
    const keywordScore = jobMatchReport.skillMatchRate;
    const sectionCount = Object.values(resumeAnalysis.sectionsDetected).filter(Boolean).length;
    const sectionScore = Math.round((sectionCount / 6) * 100);
    const contactScore = resumeAnalysis.sectionsDetected.contact ? 100 : 40;
    const readabilityScore = resumeAnalysis.bulletCount >= 4 ? 92 : 68;

    const totalAts = Math.round(
      keywordScore * 0.45 +
      sectionScore * 0.25 +
      contactScore * 0.15 +
      readabilityScore * 0.15
    );

    return {
      score: Math.min(97, Math.max(28, totalAts)),
      keywordScore,
      sectionScore,
      contactScore,
      readabilityScore,
      presentKeywords: jobMatchReport.matchedSkills,
      missingKeywords: jobMatchReport.missingSkills
    };
  }, [resumeAnalysis, jobMatchReport]);

  // Roadmap Completion %
  const roadmapProgress = useMemo(() => {
    const keys = Object.keys(completedTasks);
    if (keys.length === 0) return 0;
    const done = keys.filter(k => completedTasks[k]).length;
    return Math.round((done / keys.length) * 100);
  }, [completedTasks]);

  // Average Interview Score (out of 100)
  const avgInterviewPct = useMemo(() => {
    if (interviewHistory.length === 0) return 70;
    const avg = interviewHistory.reduce((acc, item) => acc + item.score, 0) / interviewHistory.length;
    return Math.round(avg * 10);
  }, [interviewHistory]);

  // Composite Custom Placement Readiness Indicator
  const placementReadiness = useMemo(() => {
    return Math.round(
      resumeAnalysis.scores.overall * 0.30 +
      atsReport.score * 0.25 +
      jobMatchReport.overallMatch * 0.25 +
      avgInterviewPct * 0.10 +
      roadmapProgress * 0.10
    );
  }, [resumeAnalysis, atsReport, jobMatchReport, avgInterviewPct, roadmapProgress]);

  const navigateToModule = (moduleId) => {
    setActiveTab(moduleId);
    setViewMode('app');
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme utility classes
  const bgMain = darkMode ? 'bg-[#090D16] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';
  const bgSurface = darkMode ? 'bg-[#0F1626]/90 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-sm';
  const bgSubtle = darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'analyzer', label: 'Resume Studio', icon: FileText, badge: `${resumeAnalysis.scores.overall}` },
    { id: 'ats', label: 'ATS Checker', icon: ShieldCheck, badge: `${atsReport.score}%` },
    { id: 'matcher', label: 'Job Matcher', icon: Target, badge: `${jobMatchReport.overallMatch}%` },
    { id: 'skills', label: 'Skill Intelligence', icon: BrainCircuit, badge: `${jobMatchReport.missingSkills.length} gaps` },
    { id: 'interview', label: 'Interview Lab', icon: MessageSquareCode, badge: 'AI' },
    { id: 'writer', label: 'AI Resume Writer', icon: Wand2, badge: null },
    { id: 'roadmap', label: 'Career Roadmap', icon: Map, badge: `${roadmapProgress}%` },
    { id: 'jobs', label: 'Job Explorer', icon: Briefcase, badge: `${SAMPLE_JOBS.length}` },
    { id: 'settings', label: 'Profile & Settings', icon: Settings, badge: null }
  ];

  const filteredNavItems = navItems.filter(item =>
    item.label.toLowerCase().includes(globalSearch.toLowerCase())
  );

  // ============================================================================
  // 4. LANDING PAGE VIEW (SMOOTH SCROLLING SAAS EXPERIENCE)
  // ============================================================================
  if (viewMode === 'landing') {
    const landingFeatures = [
      {
        id: 'analyzer',
        title: 'AI Resume Analyzer',
        desc: 'Deep structural parsing across Education, Skills, Projects, and Experience with quantifiable bullet diagnostics.',
        icon: FileText,
        color: 'from-violet-500 to-purple-600'
      },
      {
        id: 'ats',
        title: 'ATS Score Checker',
        desc: 'Transparent keyword density, section completeness, contact parsing, and readability audit before you apply.',
        icon: ShieldCheck,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'matcher',
        title: 'Job Description Matcher',
        desc: 'TF-IDF token similarity + semantic skill taxonomy matching against any pasted Job Description.',
        icon: Target,
        color: 'from-indigo-500 to-blue-600'
      },
      {
        id: 'skills',
        title: 'Skill Gap Analyzer',
        desc: 'Visual current-vs-target skill gap radar with priority rankings and curated learning resources.',
        icon: BrainCircuit,
        color: 'from-fuchsia-500 to-pink-600'
      },
      {
        id: 'interview',
        title: 'AI Interview Preparation',
        desc: 'Role-tailored Technical, DSA, Core CS, and Project questions with timed Mock Interview evaluation.',
        icon: MessageSquareCode,
        color: 'from-emerald-500 to-teal-600'
      },
      {
        id: 'writer',
        title: 'AI Resume Improver',
        desc: 'Side-by-side bullet rewriting with strong engineering action verbs—zero fabricated experience.',
        icon: Wand2,
        color: 'from-amber-500 to-orange-600'
      },
      {
        id: 'roadmap',
        title: 'Personalized Career Roadmap',
        desc: 'Adaptive 30/60-day weekly learning milestones and capstone projects synced to your skill gaps.',
        icon: Map,
        color: 'from-violet-600 to-indigo-600'
      },
      {
        id: 'jobs',
        title: 'Job Recommendation Engine',
        desc: 'Fresher and internship opportunities ranked by real-time compatibility with your active resume.',
        icon: Briefcase,
        color: 'from-sky-500 to-blue-600'
      }
    ];

    return (
      <div className={`min-h-screen transition-colors duration-300 ${bgMain} selection:bg-violet-500 selection:text-white`}>
        {/* Ambient Gradient Orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        </div>

        {/* Sticky Glass Navbar */}
        <header
          className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
            darkMode ? 'bg-[#090D16]/80 border-slate-800/80' : 'bg-white/85 border-slate-200'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/25">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">
                  CareerPilot <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">AI</span>
                </span>
              </div>
            </div>

            <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
              <a href="#hero" className={`transition hover:text-violet-400 ${textMuted}`}>Home</a>
              <a href="#features" className={`transition hover:text-violet-400 ${textMuted}`}>Features</a>
              <a href="#workflow" className={`transition hover:text-violet-400 ${textMuted}`}>How It Works</a>
              <a href="#architecture" className={`transition hover:text-violet-400 ${textMuted}`}>AI Architecture</a>
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle theme"
                className={`rounded-xl border p-2.5 transition ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className={`hidden rounded-xl border px-4 py-2 text-sm font-medium transition sm:inline-flex ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Sign In
              </button>

              <button
                onClick={() => navigateToModule('dashboard')}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:opacity-95"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="relative mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div
                className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                  darkMode
                    ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
                    : 'border-violet-200 bg-violet-50 text-violet-700'
                }`}
              >
                <Zap className="h-3.5 w-3.5 text-violet-400" />
                <span>Next-Gen AI Resume Intelligence & Placement Preparation Suite</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Your Career. Your Potential.{' '}
                <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Powered by AI.
                </span>
              </h1>

              <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${textMuted}`}>
                Analyze your resume with multi-layer NLP parsing, audit ATS keyword compatibility, match live job descriptions, close technical skill gaps, and practice with an AI mock interviewer—all in one unified workspace.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateToModule('analyzer')}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/25 transition hover:scale-[1.01]"
                >
                  <Upload className="h-4 w-4" />
                  <span>Analyze My Resume</span>
                </button>
                <a
                  href="#features"
                  className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition ${
                    darkMode
                      ? 'border-slate-800 bg-slate-900/80 text-slate-200 hover:border-slate-700'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Explore 10 Modules</span>
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>

              <div className={`mt-8 flex flex-wrap items-center gap-6 text-xs ${textMuted}`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Real-time Client-Side Resume NLP
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Explainable ATS & TF-IDF Scoring
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Interactive Mock Interview Lab
                </span>
              </div>
            </div>

            {/* Interactive Live Preview Mockup Card */}
            <div className="lg:col-span-5">
              <div className={`relative rounded-2xl border p-6 backdrop-blur-xl ${bgSurface}`}>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className={`ml-2 text-xs font-medium ${textMuted}`}>Live Workspace Preview</span>
                  </div>
                  <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-violet-400">
                    B.Tech CS-AI Profile
                  </span>
                </div>

                {/* Live Circular Gauges Row */}
                <div className={`grid grid-cols-3 gap-3 rounded-xl border p-4 ${bgSubtle}`}>
                  <CircularGauge
                    value={resumeAnalysis.scores.overall}
                    size={84}
                    strokeWidth={7}
                    color="#8B5CF6"
                    label="Resume Score"
                    darkMode={darkMode}
                  />
                  <CircularGauge
                    value={atsReport.score}
                    size={84}
                    strokeWidth={7}
                    color="#3B82F6"
                    label="ATS Est."
                    darkMode={darkMode}
                  />
                  <CircularGauge
                    value={jobMatchReport.overallMatch}
                    size={84}
                    strokeWidth={7}
                    color="#10B981"
                    label="Job Match"
                    darkMode={darkMode}
                  />
                </div>

                {/* Extracted Skills Preview */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-semibold">Detected Core Stack</span>
                    <span className="text-violet-400">{resumeAnalysis.extractedSkills.length} Skills Parsed</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeAnalysis.extractedSkills.slice(0, 8).map(sk => (
                      <span
                        key={sk}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium capitalize ${
                          darkMode
                            ? 'border-slate-800 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actionable AI Insight Strip */}
                <div
                  className={`mt-5 rounded-xl border p-3.5 ${
                    darkMode ? 'border-violet-500/25 bg-violet-500/10' : 'border-violet-200 bg-violet-50/70'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <div className="text-xs leading-relaxed">
                      <p className="font-semibold text-violet-400">AI Optimization Tip</p>
                      <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                        {resumeAnalysis.priorityImprovements[0] ||
                          'Quantify project metrics and add TensorFlow/Deep Learning keywords to boost AI/ML Engineer match above 85%.'}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateToModule('dashboard')}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  <span>Open Full Interactive Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Illustrative Platform Metrics Strip */}
          <div className={`mt-16 grid grid-cols-2 gap-4 rounded-2xl border p-6 sm:grid-cols-4 ${bgSurface}`}>
            <div>
              <p className="text-2xl font-extrabold text-violet-400 sm:text-3xl">10 Modules</p>
              <p className={`mt-1 text-xs font-medium ${textMuted}`}>End-to-End Placement Ecosystem</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-blue-400 sm:text-3xl">6+ NLP Signals</p>
              <p className={`mt-1 text-xs font-medium ${textMuted}`}>TF-IDF, Taxonomy & Bullet Scoring</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-400 sm:text-3xl">Transparent</p>
              <p className={`mt-1 text-xs font-medium ${textMuted}`}>Explainable Custom ATS Breakdown</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-400 sm:text-3xl">30/60-Day</p>
              <p className={`mt-1 text-xs font-medium ${textMuted}`}>Adaptive Skill Gap Roadmaps</p>
            </div>
          </div>
        </section>

        {/* 8 Core Feature Cards Grid */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Platform Capabilities</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything You Need to Land Your Dream Tech Role
            </h2>
            <p className={`mt-3 text-sm sm:text-base ${textMuted}`}>
              Click any module below to jump directly into its interactive workspace pre-loaded with sample student intelligence.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {landingFeatures.map(feat => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => navigateToModule(feat.id)}
                  className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/50 ${bgSurface}`}
                >
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feat.color} text-white shadow-md`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold group-hover:text-violet-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className={`mt-2 text-xs leading-relaxed ${textMuted}`}>{feat.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-400">
                    <span>Try Module</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4-Step Workflow */}
        <section id="workflow" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className={`rounded-3xl border p-8 sm:p-12 ${bgSurface}`}>
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">How CareerPilot AI Works</span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">From Raw Resume to Interview-Ready in 4 Steps</h2>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: '01',
                  title: 'Upload Your Resume',
                  desc: 'Upload PDF, DOCX, TXT, or paste your resume text into Resume Studio for instant section extraction.'
                },
                {
                  step: '02',
                  title: 'Audit ATS & Job Match',
                  desc: 'Compare against target Job Descriptions using TF-IDF & skill taxonomy scoring to spot missing keywords.'
                },
                {
                  step: '03',
                  title: 'Close Skill Gaps',
                  desc: 'Follow your personalized 30-day learning roadmap and rewrite weak bullets with strong action verbs.'
                },
                {
                  step: '04',
                  title: 'Ace Mock Interviews',
                  desc: 'Practice role-specific Technical, DSA, and Project questions with rubric-driven feedback.'
                }
              ].map(item => (
                <div key={item.step} className={`rounded-2xl border p-5 ${bgSubtle}`}>
                  <span className="text-xs font-extrabold tracking-wider text-violet-400">STEP {item.step}</span>
                  <h3 className="mt-2 text-base font-bold">{item.title}</h3>
                  <p className={`mt-2 text-xs leading-relaxed ${textMuted}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Architecture & Ethics Section */}
        <section id="architecture" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className={`rounded-2xl border p-6 ${bgSurface}`}>
              <Cpu className="h-6 w-6 text-violet-400" />
              <h3 className="mt-3 text-base font-bold">NLP & Feature Extraction</h3>
              <p className={`mt-2 text-xs leading-relaxed ${textMuted}`}>
                Regex + multi-domain skill taxonomy parsers isolate contact headers, academic CGPA, bullet action verbs, and quantifiable impact metrics.
              </p>
            </div>
            <div className={`rounded-2xl border p-6 ${bgSurface}`}>
              <BarChart3 className="h-6 w-6 text-blue-400" />
              <h3 className="mt-3 text-base font-bold">Explainable Scoring</h3>
              <p className={`mt-2 text-xs leading-relaxed ${textMuted}`}>
                Every ATS and Placement Readiness score breaks down exact weightings and disclaimers—never black-box or fabricated hiring guarantees.
              </p>
            </div>
            <div className={`rounded-2xl border p-6 ${bgSurface}`}>
              <Database className="h-6 w-6 text-emerald-400" />
              <h3 className="mt-3 text-base font-bold">Unified Workspace Sync</h3>
              <p className={`mt-2 text-xs leading-relaxed ${textMuted}`}>
                Updating your resume or completing roadmap tasks automatically recalculates your Placement Readiness Score across all 10 modules.
              </p>
            </div>
          </div>

          {/* Final CTA Banner */}
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-center text-white shadow-2xl sm:p-12">
            <h2 className="text-2xl font-extrabold sm:text-4xl">Your Next Opportunity Starts Here.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-violet-100 sm:text-base">
              Explore the complete 10-module CareerPilot AI placement suite right now in your browser.
            </p>
            <button
              onClick={() => navigateToModule('dashboard')}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-12 border-t py-8 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs sm:flex-row sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>CareerPilot AI — Intelligent Career Development & Placement Platform</span>
            </div>
            <div className={`flex flex-wrap gap-5 ${textMuted}`}>
              <button onClick={() => navigateToModule('dashboard')} className="hover:text-violet-400">Dashboard</button>
              <button onClick={() => navigateToModule('analyzer')} className="hover:text-violet-400">Resume Studio</button>
              <button onClick={() => navigateToModule('interview')} className="hover:text-violet-400">Interview Lab</button>
              <button onClick={() => navigateToModule('roadmap')} className="hover:text-violet-400">Roadmap</button>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        {authModalOpen && (
          <AuthModal
            mode={authMode}
            setMode={setAuthMode}
            onClose={() => setAuthModalOpen(false)}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onSuccess={() => {
              setAuthModalOpen(false);
              navigateToModule('dashboard');
              showToast('Welcome to CareerPilot AI Workspace!');
            }}
            darkMode={darkMode}
          />
        )}
      </div>
    );
  }

  // ============================================================================
  // 5. MAIN INTERACTIVE SAAS WORKSPACE (10 MODULES)
  // ============================================================================
  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${bgMain}`}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-violet-500/40 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Collapsible Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300 lg:static ${
          darkMode ? 'bg-[#0B101D] border-slate-800/80' : 'bg-white border-slate-200'
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} ${
          mobileDrawerOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-inherit px-4">
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2.5 text-left"
            title="Back to Landing Page"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="truncate text-sm font-bold tracking-tight">CareerPilot AI</p>
                <p className={`truncate text-[10px] ${textMuted}`}>Placement Suite v2.0</p>
              </div>
            )}
          </button>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden rounded-lg p-1.5 lg:inline-flex ${
              darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>

          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="rounded-lg p-1.5 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {filteredNavItems.map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateToModule(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-violet-600/90 to-blue-600/90 text-white shadow-md shadow-violet-600/20'
                    : darkMode
                    ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : ''}`} />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      active
                        ? 'bg-white/20 text-white'
                        : darkMode
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom Readiness Card */}
        {!sidebarCollapsed && (
          <div className="p-3">
            <div className={`rounded-xl border p-3.5 ${bgSubtle}`}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Placement Index</span>
                <span className="text-violet-400">{placementReadiness}/100</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${placementReadiness}%` }}
                />
              </div>
              <p className={`mt-2 text-[10px] leading-normal ${textMuted}`}>
                Custom readiness indicator based on resume, ATS, skills & mock scores.
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Workspace Header */}
        <header
          className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-6 ${
            darkMode ? 'bg-[#090D16]/85 border-slate-800/80' : 'bg-white/85 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className={`rounded-xl border p-2 lg:hidden ${
                darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-sm font-bold sm:text-base">
                Good afternoon, {userProfile.name.split(' ')[0]} 👋
              </h1>
              <p className={`hidden text-xs sm:block ${textMuted}`}>
                Target: <span className="font-medium text-violet-400">{userProfile.targetRole}</span> • {userProfile.branch} ({userProfile.graduationYear})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Modules Input */}
            <div className="relative hidden md:block">
              <Search className={`pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 ${textMuted}`} />
              <input
                type="text"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Jump to module..."
                className={`w-48 rounded-xl border py-1.5 pl-8 pr-3 text-xs outline-none transition focus:border-violet-500 ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900/90 text-slate-200 placeholder-slate-500'
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Active Resume Pill */}
            <button
              onClick={() => navigateToModule('analyzer')}
              className={`hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium xl:inline-flex ${
                darkMode
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
              title="Active parsed resume"
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="max-w-[140px] truncate">{resumeFileName}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-xl border p-2 transition ${
                darkMode
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Switch Theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => navigateToModule('settings')}
              className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-2.5 py-1.5 text-xs font-semibold text-violet-400 transition hover:bg-violet-500/20"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-[11px] font-bold text-white">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{userProfile.name.split(' ')[0]}</span>
            </button>
          </div>
        </header>

        {/* Active Module Content Viewport */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {activeTab === 'dashboard' && (
            <DashboardModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              userProfile={userProfile}
              resumeAnalysis={resumeAnalysis}
              atsReport={atsReport}
              jobMatchReport={jobMatchReport}
              placementReadiness={placementReadiness}
              roadmapProgress={roadmapProgress}
              interviewHistory={interviewHistory}
              jobApplications={jobApplications}
              navigateToModule={navigateToModule}
            />
          )}

          {activeTab === 'analyzer' && (
            <ResumeAnalyzerModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              resumeText={resumeText}
              setResumeText={setResumeText}
              resumeFileName={resumeFileName}
              setResumeFileName={setResumeFileName}
              resumeAnalysis={resumeAnalysis}
              showToast={showToast}
              navigateToModule={navigateToModule}
            />
          )}

          {activeTab === 'ats' && (
            <ATSCheckerModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              resumeAnalysis={resumeAnalysis}
              atsReport={atsReport}
              selectedRolePreset={selectedRolePreset}
              setSelectedRolePreset={setSelectedRolePreset}
              setCustomJdText={setCustomJdText}
              navigateToModule={navigateToModule}
            />
          )}

          {activeTab === 'matcher' && (
            <JobMatcherModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              resumeAnalysis={resumeAnalysis}
              selectedRolePreset={selectedRolePreset}
              setSelectedRolePreset={setSelectedRolePreset}
              customJdText={customJdText}
              setCustomJdText={setCustomJdText}
              targetCompany={targetCompany}
              setTargetCompany={setTargetCompany}
              jobMatchReport={jobMatchReport}
              showToast={showToast}
            />
          )}

          {activeTab === 'skills' && (
            <SkillGapModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              resumeAnalysis={resumeAnalysis}
              jobMatchReport={jobMatchReport}
              skillStatuses={skillStatuses}
              setSkillStatuses={setSkillStatuses}
              showToast={showToast}
              navigateToModule={navigateToModule}
            />
          )}

          {activeTab === 'interview' && (
            <InterviewLabModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              userProfile={userProfile}
              resumeAnalysis={resumeAnalysis}
              interviewHistory={interviewHistory}
              setInterviewHistory={setInterviewHistory}
              showToast={showToast}
            />
          )}

          {activeTab === 'writer' && (
            <ResumeWriterModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              resumeText={resumeText}
              setResumeText={setResumeText}
              resumeAnalysis={resumeAnalysis}
              userProfile={userProfile}
              showToast={showToast}
            />
          )}

          {activeTab === 'roadmap' && (
            <CareerRoadmapModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              userProfile={userProfile}
              roadmapDuration={roadmapDuration}
              setRoadmapDuration={setRoadmapDuration}
              completedTasks={completedTasks}
              setCompletedTasks={setCompletedTasks}
              roadmapProgress={roadmapProgress}
              jobMatchReport={jobMatchReport}
              showToast={showToast}
            />
          )}

          {activeTab === 'jobs' && (
            <JobExplorerModule
              darkMode={darkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              resumeText={resumeText}
              jobApplications={jobApplications}
              setJobApplications={setJobApplications}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <ProfileSettingsModule
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              bgSurface={bgSurface}
              bgSubtle={bgSubtle}
              textMuted={textMuted}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              setResumeText={setResumeText}
              setResumeFileName={setResumeFileName}
              showToast={showToast}
              setViewMode={setViewMode}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 1: PLACEMENT ANALYTICS DASHBOARD
// ============================================================================
function DashboardModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  userProfile,
  resumeAnalysis,
  atsReport,
  jobMatchReport,
  placementReadiness,
  roadmapProgress,
  interviewHistory,
  jobApplications,
  navigateToModule
}) {
  const kpiCards = [
    {
      title: 'Resume Quality Score',
      value: resumeAnalysis.scores.overall,
      color: '#8B5CF6',
      sublabel: 'Custom NLP',
      note: `${resumeAnalysis.extractedSkills.length} technical skills parsed`,
      target: 'analyzer'
    },
    {
      title: 'ATS Compatibility',
      value: atsReport.score,
      color: '#3B82F6',
      sublabel: 'Estimated',
      note: `${atsReport.presentKeywords.length} matched / ${atsReport.missingKeywords.length} missing`,
      target: 'ats'
    },
    {
      title: 'Target Job Match',
      value: jobMatchReport.overallMatch,
      color: '#10B981',
      sublabel: 'TF-IDF + Skill',
      note: `Aligned for ${userProfile.targetRole}`,
      target: 'matcher'
    },
    {
      title: 'Placement Readiness',
      value: placementReadiness,
      color: '#F59E0B',
      sublabel: 'Composite',
      note: 'Custom readiness indicator',
      target: 'roadmap'
    }
  ];

  // Illustrative weekly trajectory chart data anchored to current score
  const chartPoints = [
    { week: 'W1', resume: Math.max(45, resumeAnalysis.scores.overall - 18), ats: Math.max(40, atsReport.score - 20) },
    { week: 'W2', resume: Math.max(52, resumeAnalysis.scores.overall - 11), ats: Math.max(48, atsReport.score - 13) },
    { week: 'W3', resume: Math.max(60, resumeAnalysis.scores.overall - 5), ats: Math.max(55, atsReport.score - 6) },
    { week: 'Now', resume: resumeAnalysis.scores.overall, ats: atsReport.score }
  ];

  return (
    <div className="space-y-6">
      {/* Top KPI Circular Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map(card => (
          <div
            key={card.title}
            onClick={() => navigateToModule(card.target)}
            className={`group cursor-pointer rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-violet-500/50 ${bgSurface}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold ${textMuted}`}>{card.title}</p>
                <p className="mt-1 text-2xl font-extrabold">{card.value}/100</p>
                <p className={`mt-2 text-[11px] ${textMuted}`}>{card.note}</p>
              </div>
              <CircularGauge
                value={card.value}
                size={76}
                strokeWidth={7}
                color={card.color}
                sublabel={card.sublabel}
                darkMode={darkMode}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Middle Analytics Row */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Score Progression & Section Breakdown */}
        <div className={`rounded-2xl border p-6 lg:col-span-7 ${bgSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold">Resume & ATS Optimization Trajectory</h2>
              <p className={`text-xs ${textMuted}`}>
                Illustrative progression + live section breakdown from your active resume
              </p>
            </div>
            <button
              onClick={() => navigateToModule('analyzer')}
              className="rounded-xl bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-400 hover:bg-violet-500/25"
            >
              Inspect Resume
            </button>
          </div>

          {/* Interactive Bar Comparison Chart */}
          <div className={`mt-6 grid grid-cols-4 gap-4 rounded-xl border p-5 ${bgSubtle}`}>
            {chartPoints.map(pt => (
              <div key={pt.week} className="flex flex-col items-center">
                <div className="flex h-36 items-end gap-2">
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-[10px] font-bold text-violet-400">{pt.resume}</span>
                    <div
                      className="w-5 rounded-t-md bg-gradient-to-t from-violet-600 to-violet-400 transition-all duration-500"
                      style={{ height: `${pt.resume * 1.1}px` }}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-[10px] font-bold text-blue-400">{pt.ats}</span>
                    <div
                      className="w-5 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500"
                      style={{ height: `${pt.ats * 1.1}px` }}
                    />
                  </div>
                </div>
                <span className={`mt-2 text-xs font-semibold ${textMuted}`}>{pt.week}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> Resume Quality Score
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Estimated ATS Score
            </span>
          </div>
        </div>

        {/* Top Missing Skills & Quick Actions */}
        <div className={`rounded-2xl border p-6 lg:col-span-5 ${bgSurface}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Priority Skill Gaps</h2>
              <p className={`text-xs ${textMuted}`}>Detected from target Job Description</p>
            </div>
            <button
              onClick={() => navigateToModule('skills')}
              className="text-xs font-semibold text-violet-400 hover:underline"
            >
              Skill Lab →
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {jobMatchReport.missingSkills.length > 0 ? (
              jobMatchReport.missingSkills.slice(0, 5).map((skill, idx) => (
                <div
                  key={skill}
                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 ${bgSubtle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/15 text-xs font-bold text-rose-400">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold capitalize">{skill}</span>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                    High Priority
                  </span>
                </div>
              ))
            ) : (
              <div className={`rounded-xl border p-4 text-xs ${bgSubtle}`}>
                All target job description keywords are covered in your resume!
              </div>
            )}
          </div>

          {/* Roadmap Progress Mini Bar */}
          <div className={`mt-5 rounded-xl border p-4 ${bgSubtle}`}>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>30-Day Career Roadmap</span>
              <span className="text-emerald-400">{roadmapProgress}% Complete</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-700/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${roadmapProgress}%` }}
              />
            </div>
            <button
              onClick={() => navigateToModule('roadmap')}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:underline"
            >
              <span>Continue Learning Plan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Mock Interview History & Saved Jobs */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`rounded-2xl border p-6 ${bgSurface}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Recent Mock Interview Sessions</h2>
            <button
              onClick={() => navigateToModule('interview')}
              className="rounded-xl bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/25"
            >
              Start Mock Session
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {interviewHistory.slice(0, 3).map(item => (
              <div key={item.id} className={`rounded-xl border p-3.5 ${bgSubtle}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{item.category}</span>
                  <span className="rounded-lg bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400">
                    {item.score}/10
                  </span>
                </div>
                <p className={`mt-1 text-xs ${textMuted}`}>{item.summary}</p>
                <p className={`mt-1.5 text-[10px] ${textMuted}`}>{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl border p-6 ${bgSurface}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Tracked Job Opportunities</h2>
            <button
              onClick={() => navigateToModule('jobs')}
              className="rounded-xl bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-400 hover:bg-violet-500/25"
            >
              Explore Jobs
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {SAMPLE_JOBS.filter(j => jobApplications[j.id]).map(job => (
              <div key={job.id} className={`flex items-center justify-between rounded-xl border p-3.5 ${bgSubtle}`}>
                <div>
                  <p className="text-xs font-bold">{job.title}</p>
                  <p className={`text-[11px] ${textMuted}`}>
                    {job.company} • {job.location}
                  </p>
                </div>
                <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[11px] font-bold text-violet-400">
                  {jobApplications[job.id]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 2: AI RESUME ANALYZER (RESUME STUDIO)
// ============================================================================
function ResumeAnalyzerModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  resumeText,
  setResumeText,
  resumeFileName,
  setResumeFileName,
  resumeAnalysis,
  showToast,
  navigateToModule
}) {
  const fileInputRef = useRef(null);
  const [isEditingText, setIsEditingText] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        // Clean binary artifacts if user uploads a raw PDF/DOCX without server-side PyMuPDF
        const printable = content.replace(/[^\x20-\x7E\r\n]/g, ' ').replace(/\s{3,}/g, '\n');
        if (printable.trim().length > 120) {
          setResumeText(printable.trim());
          showToast(`Parsed "${file.name}" successfully!`);
        } else {
          showToast(`Loaded "${file.name}". Paste text below if binary PDF encoding is compressed.`);
          setIsEditingText(true);
        }
      }
    };
    reader.readAsText(file);
  };

  const downloadReport = () => {
    const reportContent = `CAREERPILOT AI — RESUME INTELLIGENCE REPORT
Candidate: ${resumeAnalysis.candidateName}
File: ${resumeFileName}
Overall Custom Quality Score: ${resumeAnalysis.scores.overall}/100

PARAMETER BREAKDOWN:
- Technical Skills: ${resumeAnalysis.scores.technical}/100
- Projects Quality: ${resumeAnalysis.scores.projects}/100
- Education: ${resumeAnalysis.scores.education}/100
- Experience: ${resumeAnalysis.scores.experience}/100
- Formatting: ${resumeAnalysis.scores.formatting}/100

EXTRACTED SKILLS (${resumeAnalysis.extractedSkills.length}):
${resumeAnalysis.extractedSkills.join(', ')}

PRIORITY AI IMPROVEMENTS:
${resumeAnalysis.priorityImprovements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

Note: Custom CareerPilot AI heuristic & NLP evaluation score, not an official vendor ATS score.`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CareerPilot_Resume_Analysis_Report.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume Analysis Report downloaded!');
  };

  const parameterBars = [
    { label: 'Technical Skills', score: resumeAnalysis.scores.technical, color: 'bg-violet-500' },
    { label: 'Projects Quality', score: resumeAnalysis.scores.projects, color: 'bg-blue-500' },
    { label: 'Education', score: resumeAnalysis.scores.education, color: 'bg-emerald-500' },
    { label: 'Experience', score: resumeAnalysis.scores.experience, color: 'bg-amber-500' },
    { label: 'Formatting & Structure', score: resumeAnalysis.scores.formatting, color: 'bg-indigo-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Module 02 • NLP Resume Parser</span>
          <h2 className="mt-1 text-xl font-extrabold">AI Resume Studio & Structural Diagnostics</h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Upload a resume file or edit raw text directly to inspect extracted entities, bullet quality, and section scores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Resume</span>
          </button>

          <button
            onClick={() => {
              setResumeText(SAMPLE_RESUME_TEXT);
              setResumeFileName('Aarav_Sharma_CS_AI_Resume.pdf');
              showToast('Loaded Sample B.Tech CS-AI Resume!');
            }}
            className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold ${
              darkMode ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
            }`}
          >
            Load Sample Resume
          </button>

          <button
            onClick={downloadReport}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold ${
              darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Score & Parameter Breakdown */}
        <div className="space-y-6 lg:col-span-5">
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Resume Quality Index</h3>
                <p className={`text-xs ${textMuted}`}>Custom CareerPilot NLP Score</p>
              </div>
              <CircularGauge
                value={resumeAnalysis.scores.overall}
                size={96}
                strokeWidth={8}
                color="#8B5CF6"
                sublabel="Quality"
                darkMode={darkMode}
              />
            </div>

            <div className="mt-6 space-y-4">
              {parameterBars.map(p => (
                <div key={p.label}>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span>{p.label}</span>
                    <span>{p.score}/100</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/30">
                    <div
                      className={`h-full rounded-full ${p.color} transition-all duration-500`}
                      style={{ width: `${p.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-5 rounded-xl border p-3 text-[11px] ${bgSubtle} ${textMuted}`}>
              Note: This is CareerPilot AI&apos;s custom resume quality metric based on section completeness, skill density, and quantified bullets—not an official employer ATS vendor score.
            </div>
          </div>

          {/* Detected Sections Checklist */}
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <h3 className="text-base font-bold">Section Completeness Audit</h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {Object.entries(resumeAnalysis.sectionsDetected).map(([sec, ok]) => (
                <div
                  key={sec}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold capitalize ${bgSubtle}`}
                >
                  {ok ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-rose-400" />
                  )}
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Extracted Entities, AI Feedback & Live Resume Text Editor */}
        <div className="space-y-6 lg:col-span-7">
          {/* Parsed Entities Card */}
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">Parsed Candidate Entities</h3>
              <span className="rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-400">
                {resumeAnalysis.wordCount} Words • {resumeAnalysis.bulletCount} Bullets
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className={`rounded-xl border p-3 text-xs ${bgSubtle}`}>
                <span className={textMuted}>Candidate Name</span>
                <p className="mt-0.5 font-bold">{resumeAnalysis.candidateName}</p>
              </div>
              <div className={`rounded-xl border p-3 text-xs ${bgSubtle}`}>
                <span className={textMuted}>Email & Phone</span>
                <p className="mt-0.5 truncate font-bold">{resumeAnalysis.email}</p>
              </div>
              <div className={`rounded-xl border p-3 text-xs ${bgSubtle}`}>
                <span className={textMuted}>GitHub Portfolio</span>
                <p className="mt-0.5 truncate font-bold text-blue-400">{resumeAnalysis.github}</p>
              </div>
              <div className={`rounded-xl border p-3 text-xs ${bgSubtle}`}>
                <span className={textMuted}>Quantified Impact Bullets</span>
                <p className="mt-0.5 font-bold text-emerald-400">
                  {resumeAnalysis.quantifiedCount} of {resumeAnalysis.bulletCount} bullets include metrics
                </p>
              </div>
            </div>

            {/* Extracted Skills by Category */}
            <div className="mt-5">
              <p className="text-xs font-bold">Categorized Technical Skills ({resumeAnalysis.extractedSkills.length})</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {resumeAnalysis.extractedSkills.map(skill => (
                  <span
                    key={skill}
                    className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold capitalize text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable AI Feedback */}
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">AI Diagnostics & Priority Improvements</h3>
              <button
                onClick={() => navigateToModule('writer')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:underline"
              >
                <span>Fix in AI Resume Writer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {resumeAnalysis.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{s}</span>
                </div>
              ))}
              {resumeAnalysis.priorityImprovements.map((imp, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editable Resume Text Box */}
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Active Resume Text Source</h3>
                <p className={`text-xs ${textMuted}`}>Edit any line below to see real-time score updates across the entire app</p>
              </div>
              <button
                onClick={() => setIsEditingText(!isEditingText)}
                className="rounded-xl bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-400"
              >
                {isEditingText ? 'Done Editing' : 'Edit Text'}
              </button>
            </div>

            <textarea
              rows={9}
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              className={`mt-3 w-full rounded-xl border p-3.5 font-mono text-xs leading-relaxed outline-none focus:border-violet-500 ${
                darkMode
                  ? 'border-slate-800 bg-slate-950 text-slate-200'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 3: ATS SCORE CHECKER
// ============================================================================
function ATSCheckerModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  resumeAnalysis,
  atsReport,
  selectedRolePreset,
  setSelectedRolePreset,
  setCustomJdText,
  navigateToModule
}) {
  const handleRoleSwitch = (role) => {
    setSelectedRolePreset(role);
    if (ROLE_PROFILES[role]) {
      setCustomJdText(ROLE_PROFILES[role].description);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Module 03 • Applicant Tracking Audit</span>
          <h2 className="mt-1 text-xl font-extrabold">ATS Compatibility & Keyword Scanner</h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Evaluates keyword alignment, parseable section headings, contact metadata, and bullet formatting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${textMuted}`}>Benchmark Role:</span>
          <select
            value={selectedRolePreset}
            onChange={e => handleRoleSwitch(e.target.value)}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold outline-none ${
              darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            {Object.keys(ROLE_PROFILES).map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main ATS Score & Factors */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className={`flex flex-col items-center justify-center rounded-2xl border p-6 text-center lg:col-span-4 ${bgSurface}`}>
          <CircularGauge
            value={atsReport.score}
            size={150}
            strokeWidth={12}
            color={atsReport.score >= 75 ? '#10B981' : '#F59E0B'}
            sublabel="ATS Est."
            darkMode={darkMode}
          />
          <h3 className="mt-4 text-lg font-extrabold">
            {atsReport.score >= 80
              ? 'High ATS Compatibility'
              : atsReport.score >= 65
              ? 'Good Compatibility'
              : 'Needs Keyword Optimization'}
          </h3>
          <p className={`mt-2 text-xs leading-relaxed ${textMuted}`}>
            Transparent weighted audit: 45% Keyword Match, 25% Section Structure, 15% Contact Metadata, 15% Readability.
          </p>
          <div className={`mt-4 w-full rounded-xl border p-3 text-[11px] ${bgSubtle} ${textMuted}`}>
            Disclaimer: Estimated ATS compatibility indicator. Actual enterprise ATS software (Workday, Greenhouse, Taleo) uses proprietary recruiter filters.
          </div>
        </div>

        <div className="space-y-6 lg:col-span-8">
          {/* Factor Cards */}
          <div className={`grid gap-4 rounded-2xl border p-6 sm:grid-cols-2 ${bgSurface}`}>
            {[
              { label: 'Keyword Match Rate', val: atsReport.keywordScore, desc: 'Target job skill coverage' },
              { label: 'Section Headers', val: atsReport.sectionScore, desc: 'Standard Education/Skills/Projects headers' },
              { label: 'Contact Parsing', val: atsReport.contactScore, desc: 'Email, phone & profile links detected' },
              { label: 'Bullet Readability', val: atsReport.readabilityScore, desc: 'Clean single-column action bullets' }
            ].map(factor => (
              <div key={factor.label} className={`rounded-xl border p-4 ${bgSubtle}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{factor.label}</span>
                  <span className="text-xs font-extrabold text-blue-400">{factor.val}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/30">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${factor.val}%` }} />
                </div>
                <p className={`mt-2 text-[11px] ${textMuted}`}>{factor.desc}</p>
              </div>
            ))}
          </div>

          {/* Present vs Missing Keywords */}
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <h3 className="text-base font-bold">Keyword Presence Analysis</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Present Keywords ({atsReport.presentKeywords.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {atsReport.presentKeywords.map(kw => (
                    <span
                      key={kw}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <XCircle className="h-4 w-4" /> Missing Keywords ({atsReport.missingKeywords.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {atsReport.missingKeywords.length > 0 ? (
                    atsReport.missingKeywords.map(kw => (
                      <span
                        key={kw}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold capitalize text-rose-300"
                      >
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className={`text-xs ${textMuted}`}>Zero missing core keywords!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => navigateToModule('matcher')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:underline"
              >
                <span>Compare Against Custom Job Description</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 4: JOB DESCRIPTION MATCHER
// ============================================================================
function JobMatcherModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  resumeAnalysis,
  selectedRolePreset,
  setSelectedRolePreset,
  customJdText,
  setCustomJdText,
  targetCompany,
  setTargetCompany,
  jobMatchReport,
  showToast
}) {
  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border p-6 ${bgSurface}`}>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Module 04 • TF-IDF & Semantic Skill Matcher
        </span>
        <h2 className="mt-1 text-xl font-extrabold">Job Description Compatibility Workspace</h2>
        <p className={`mt-1 text-xs ${textMuted}`}>
          Paste any target job posting below to compute skill overlap, lexical TF similarity, and semantic domain alignment.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={`mb-1.5 block text-xs font-semibold ${textMuted}`}>Target Role Preset</label>
            <select
              value={selectedRolePreset}
              onChange={e => {
                const role = e.target.value;
                setSelectedRolePreset(role);
                setCustomJdText(ROLE_PROFILES[role].description);
                showToast(`Loaded ${role} JD template`);
              }}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-semibold outline-none ${
                darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
              }`}
            >
              {Object.keys(ROLE_PROFILES).map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`mb-1.5 block text-xs font-semibold ${textMuted}`}>Target Company / Tier</label>
            <input
              type="text"
              value={targetCompany}
              onChange={e => setTargetCompany(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-semibold outline-none ${
                darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={`mb-1.5 block text-xs font-semibold ${textMuted}`}>
            Job Description Text (Paste any live JD)
          </label>
          <textarea
            rows={5}
            value={customJdText}
            onChange={e => setCustomJdText(e.target.value)}
            placeholder="Paste job responsibilities and required skills here..."
            className={`w-full rounded-xl border p-3.5 text-xs leading-relaxed outline-none focus:border-violet-500 ${
              darkMode ? 'border-slate-800 bg-slate-950 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-800'
            }`}
          />
        </div>
      </div>

      {/* Match Results Dashboard */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className={`flex flex-col items-center justify-center rounded-2xl border p-6 text-center lg:col-span-4 ${bgSurface}`}>
          <CircularGauge
            value={jobMatchReport.overallMatch}
            size={144}
            strokeWidth={11}
            color="#10B981"
            sublabel="Match"
            darkMode={darkMode}
          />
          <h3 className="mt-4 text-base font-extrabold">{selectedRolePreset}</h3>
          <p className={`text-xs ${textMuted}`}>{targetCompany}</p>

          <div className="mt-5 w-full space-y-2 text-left text-xs">
            <div className={`flex justify-between rounded-xl border px-3 py-2 ${bgSubtle}`}>
              <span className={textMuted}>Required Skill Match</span>
              <span className="font-bold text-emerald-400">{jobMatchReport.skillMatchRate}%</span>
            </div>
            <div className={`flex justify-between rounded-xl border px-3 py-2 ${bgSubtle}`}>
              <span className={textMuted}>Lexical Token Overlap</span>
              <span className="font-bold text-blue-400">{jobMatchReport.keywordSimilarity}%</span>
            </div>
            <div className={`flex justify-between rounded-xl border px-3 py-2 ${bgSubtle}`}>
              <span className={textMuted}>Education Fit</span>
              <span className="font-bold">{jobMatchReport.educationRelevance.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Side-by-side Skill & Recommendation Breakdown */}
        <div className={`space-y-5 rounded-2xl border p-6 lg:col-span-8 ${bgSurface}`}>
          <h3 className="text-base font-bold">Side-by-Side Resume vs. Job Requirement Matrix</h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className={`rounded-xl border p-4 ${bgSubtle}`}>
              <p className="text-xs font-bold text-emerald-400">
                Matched Skills ({jobMatchReport.matchedSkills.length})
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {jobMatchReport.matchedSkills.map(s => (
                  <span
                    key={s}
                    className="rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] font-semibold capitalize text-emerald-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border p-4 ${bgSubtle}`}>
              <p className="text-xs font-bold text-rose-400">
                Missing Skills ({jobMatchReport.missingSkills.length})
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {jobMatchReport.missingSkills.map(s => (
                  <span
                    key={s}
                    className="rounded-md bg-rose-500/15 px-2 py-1 text-[11px] font-semibold capitalize text-rose-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border p-4 ${bgSubtle}`}>
              <p className="text-xs font-bold text-violet-400">
                Semantic Related ({jobMatchReport.relatedSkills.length})
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {jobMatchReport.relatedSkills.length > 0 ? (
                  jobMatchReport.relatedSkills.map(s => (
                    <span
                      key={s}
                      className="rounded-md bg-violet-500/15 px-2 py-1 text-[11px] font-semibold capitalize text-violet-300"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className={`text-[11px] ${textMuted}`}>Adjacent domain skills appear here</span>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 text-xs leading-relaxed">
            <p className="font-bold text-violet-400">AI Tailoring Recommendation</p>
            <p className="mt-1">
              {jobMatchReport.missingSkills.length > 0
                ? `To raise your match score for ${selectedRolePreset}, build a hands-on mini-project incorporating ${jobMatchReport.missingSkills
                    .slice(0, 3)
                    .map(s => s.toUpperCase())
                    .join(', ')} and explicitly reference those tools in your project bullet points.`
                : `Your resume demonstrates strong alignment with ${selectedRolePreset}. Focus on quantifying latency, accuracy, or scale metrics in your top two projects.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 5: SKILL GAP ANALYZER
// ============================================================================
function SkillGapModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  resumeAnalysis,
  jobMatchReport,
  skillStatuses,
  setSkillStatuses,
  showToast,
  navigateToModule
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skillCatalog = [
    { name: 'python', category: 'Programming', current: 85, target: 90, priority: 'Core', resource: 'Effective Python & FastAPI Docs' },
    { name: 'machine learning', category: 'Machine Learning', current: 75, target: 90, priority: 'Core', resource: 'Hands-On ML with Scikit-Learn' },
    { name: 'sql', category: 'Database & Cloud', current: 72, target: 85, priority: 'Core', resource: 'Mode SQL Analytics & Indexing Guide' },
    { name: 'nlp', category: 'Deep Learning & NLP', current: 70, target: 85, priority: 'High', resource: 'HuggingFace NLP Course' },
    { name: 'deep learning', category: 'Deep Learning & NLP', current: 42, target: 80, priority: 'Critical', resource: 'DeepLearning.AI Neural Networks' },
    { name: 'tensorflow', category: 'Deep Learning & NLP', current: 30, target: 75, priority: 'Critical', resource: 'TensorFlow 2 Official Tutorials' },
    { name: 'statistics', category: 'Machine Learning', current: 48, target: 80, priority: 'High', resource: 'StatQuest Probability & Hypothesis Testing' },
    { name: 'data structures', category: 'Data Structures & Algorithms', current: 65, target: 90, priority: 'Critical', resource: 'NeetCode 150 Curated Patterns' },
    { name: 'algorithms', category: 'Data Structures & Algorithms', current: 58, target: 88, priority: 'Critical', resource: 'Dynamic Programming & Graph Mastery' },
    { name: 'docker', category: 'Database & Cloud', current: 25, target: 70, priority: 'Moderate', resource: 'Docker for ML Model Deployment' }
  ];

  const categories = ['All', ...new Set(skillCatalog.map(s => s.category))];
  const visibleSkills = selectedCategory === 'All'
    ? skillCatalog
    : skillCatalog.filter(s => s.category === selectedCategory);

  const cycleStatus = (skillName) => {
    const order = ['Not Started', 'Learning', 'Intermediate', 'Completed'];
    const current = skillStatuses[skillName] || 'Not Started';
    const next = order[(order.indexOf(current) + 1) % order.length];
    setSkillStatuses({ ...skillStatuses, [skillName]: next });
    showToast(`Updated "${skillName}" status to ${next}`);
  };

  const statusBadgeColor = (st) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Learning':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">
            Module 05 • Competency Gap Intelligence
          </span>
          <h2 className="mt-1 text-xl font-extrabold">Skill Gap Matrix & Learning Tracker</h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Compare your current proficiency against industry placement benchmarks and track your upskilling progress.
          </p>
        </div>

        <button
          onClick={() => navigateToModule('roadmap')}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white"
        >
          <span>Generate 30-Day Study Plan</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'border-violet-500 bg-violet-600 text-white'
                : darkMode
                ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Gap Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {visibleSkills.map(skill => {
          const inResume = resumeAnalysis.extractedSkills.includes(skill.name);
          const status = skillStatuses[skill.name] || (inResume ? 'Intermediate' : 'Not Started');
          const effectiveCurrent =
            status === 'Completed'
              ? skill.target
              : status === 'Intermediate'
              ? Math.max(skill.current, 72)
              : status === 'Learning'
              ? Math.max(skill.current, 50)
              : skill.current;

          return (
            <div key={skill.name} className={`rounded-2xl border p-5 ${bgSurface}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold capitalize">{skill.name}</h3>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        skill.priority === 'Critical'
                          ? 'bg-rose-500/15 text-rose-400'
                          : skill.priority === 'High'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-blue-500/15 text-blue-400'
                      }`}
                    >
                      {skill.priority}
                    </span>
                  </div>
                  <p className={`mt-0.5 text-[11px] ${textMuted}`}>{skill.category}</p>
                </div>

                <button
                  onClick={() => cycleStatus(skill.name)}
                  className={`rounded-xl border px-3 py-1 text-[11px] font-bold transition hover:opacity-90 ${statusBadgeColor(status)}`}
                  title="Click to cycle learning status"
                >
                  {status}
                </button>
              </div>

              {/* Dual Progress Bar: Current vs Target */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className={textMuted}>Current Readiness: {effectiveCurrent}%</span>
                  <span className="font-semibold text-violet-400">Target Benchmark: {skill.target}%</span>
                </div>
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-700/30">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-violet-500/30"
                    style={{ width: `${skill.target}%` }}
                  />
                  <div
                    className="relative h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${effectiveCurrent}%` }}
                  />
                </div>
              </div>

              <div className={`mt-4 flex items-center justify-between rounded-xl border px-3 py-2 text-xs ${bgSubtle}`}>
                <span className="flex items-center gap-1.5 truncate">
                  <BookOpen className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                  <span className="truncate">{skill.resource}</span>
                </span>
                <span className="ml-2 shrink-0 text-[10px] font-semibold text-violet-400">
                  Gap: {Math.max(0, skill.target - effectiveCurrent)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 6: AI INTERVIEW LAB (MOCK INTERVIEW SIMULATOR)
// ============================================================================
function InterviewLabModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  userProfile,
  resumeAnalysis,
  interviewHistory,
  setInterviewHistory,
  showToast
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mockActive, setMockActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const questions = useMemo(() => {
    if (selectedCategory === 'All') return INTERVIEW_QUESTION_BANK;
    return INTERVIEW_QUESTION_BANK.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion = questions[currentIdx % questions.length];

  useEffect(() => {
    if (!mockActive) return;
    const timer = setInterval(() => setSecondsElapsed(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [mockActive]);

  const evaluateAnswer = () => {
    if (!userAnswer.trim()) {
      showToast('Please write your response before evaluating.', 'error');
      return;
    }

    const ansLower = userAnswer.toLowerCase();
    const matched = currentQuestion.keywords.filter(kw => ansLower.includes(kw));
    const missing = currentQuestion.keywords.filter(kw => !ansLower.includes(kw));
    const wordLen = userAnswer.trim().split(/\s+/).length;

    const conceptCoverage = matched.length / currentQuestion.keywords.length;
    const depthBonus = wordLen >= 35 ? 1.5 : wordLen >= 18 ? 0.8 : 0;
    const rawScore = Math.min(9.8, Math.max(3.5, conceptCoverage * 8.5 + depthBonus));
    const finalScore = Number(rawScore.toFixed(1));

    const feedback = {
      score: finalScore,
      matchedConcepts: matched,
      missingConcepts: missing.slice(0, 4),
      clarityNote:
        wordLen >= 30
          ? 'Well-structured response with solid technical articulation.'
          : 'Concise answer—try expanding with concrete trade-offs or an example.',
      idealAnswer: currentQuestion.idealAnswer
    };

    setEvaluationResult(feedback);

    const newEntry = {
      id: `int-${Date.now()}`,
      date: 'Just now',
      category: currentQuestion.category,
      score: finalScore,
      questionsCount: 1,
      summary: `Q: "${currentQuestion.question.slice(0, 52)}..." — Covered ${matched.length}/${currentQuestion.keywords.length} key concepts.`
    };
    setInterviewHistory([newEntry, ...interviewHistory]);
    showToast(`Answer evaluated: ${finalScore}/10`);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Module 06 • Adaptive Interview Simulator
          </span>
          <h2 className="mt-1 text-xl font-extrabold">AI Interview Lab & Mock Evaluator</h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Practice role-specific technical, DSA, DBMS, OOP, and project questions with instant rubric-based scoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedCategory}
            onChange={e => {
              setSelectedCategory(e.target.value);
              setCurrentIdx(0);
              setEvaluationResult(null);
            }}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold outline-none ${
              darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <option value="All">All Categories ({INTERVIEW_QUESTION_BANK.length})</option>
            {[...new Set(INTERVIEW_QUESTION_BANK.map(q => q.category))].map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setMockActive(!mockActive);
              setSecondsElapsed(0);
              setEvaluationResult(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-md"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{mockActive ? 'Reset Timer' : 'Start Timed Mock'}</span>
          </button>
        </div>
      </div>

      {/* Active Mock Question Card */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className={`space-y-5 rounded-2xl border p-6 lg:col-span-8 ${bgSurface}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-bold text-violet-400">
                {currentQuestion.category}
              </span>
              <span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${bgSubtle}`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              {mockActive && (
                <span className="flex items-center gap-1 text-amber-400">
                  <Clock className="h-3.5 w-3.5" /> {formatTime(secondsElapsed)}
                </span>
              )}
              <span className={textMuted}>
                Question {(currentIdx % questions.length) + 1} of {questions.length}
              </span>
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${bgSubtle}`}>
            <p className="text-base font-bold leading-snug">{currentQuestion.question}</p>
          </div>

          <div>
            <label className={`mb-2 block text-xs font-semibold ${textMuted}`}>
              Your Technical Response
            </label>
            <textarea
              rows={5}
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Structure your answer clearly with core definitions, time/space complexity or trade-offs, and a real example..."
              className={`w-full rounded-xl border p-3.5 text-xs leading-relaxed outline-none focus:border-violet-500 ${
                darkMode ? 'border-slate-800 bg-slate-950 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                setCurrentIdx(i => i + 1);
                setUserAnswer('');
                setEvaluationResult(null);
              }}
              className={`rounded-xl border px-4 py-2.5 text-xs font-semibold ${
                darkMode ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
              }`}
            >
              Next Question →
            </button>

            <button
              onClick={evaluateAnswer}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Evaluate Answer with AI Rubric</span>
            </button>
          </div>

          {/* Evaluation Result Panel */}
          {evaluationResult && (
            <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-emerald-400">AI Rubric Evaluation</h4>
                  <p className={`text-xs ${textMuted}`}>{evaluationResult.clarityNote}</p>
                </div>
                <div className="rounded-xl bg-emerald-500/20 px-3.5 py-2 text-base font-extrabold text-emerald-300">
                  {evaluationResult.score} / 10
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className={`rounded-xl border p-3 ${bgSubtle}`}>
                  <p className="text-[11px] font-bold text-emerald-400">Concepts Covered</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {evaluationResult.matchedConcepts.length > 0 ? (
                      evaluationResult.matchedConcepts.map(c => (
                        <span key={c} className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          {c}
                        </span>
                      ))
                    ) : (
                      <span className={`text-[11px] ${textMuted}`}>Include core terminology</span>
                    )}
                  </div>
                </div>

                <div className={`rounded-xl border p-3 ${bgSubtle}`}>
                  <p className="text-[11px] font-bold text-amber-400">Suggested Concepts to Mention</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {evaluationResult.missingConcepts.map(c => (
                      <span key={c} className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`rounded-xl border p-3.5 text-xs leading-relaxed ${bgSubtle}`}>
                <p className="font-bold text-violet-400">Reference Ideal Answer</p>
                <p className="mt-1">{evaluationResult.idealAnswer}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Personalized Resume-Triggered Questions & History */}
        <div className="space-y-6 lg:col-span-4">
          <div className={`rounded-2xl border p-5 ${bgSurface}`}>
            <h3 className="text-sm font-bold">Resume-Triggered Questions</h3>
            <p className={`mt-1 text-xs ${textMuted}`}>
              Generated from your detected skills ({resumeAnalysis.extractedSkills.slice(0, 4).join(', ')})
            </p>
            <div className="mt-3 space-y-2.5 text-xs">
              <div className={`rounded-xl border p-3 ${bgSubtle}`}>
                &ldquo;How did you evaluate retrieval accuracy in your SmartDoc AI document Q&amp;A pipeline?&rdquo;
              </div>
              <div className={`rounded-xl border p-3 ${bgSubtle}`}>
                &ldquo;Why did you choose Random Forest over Logistic Regression for the Student Placement Predictor?&rdquo;
              </div>
              <div className={`rounded-xl border p-3 ${bgSubtle}`}>
                &ldquo;How do you index SQL tables to optimize high-frequency REST API queries?&rdquo;
              </div>
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${bgSurface}`}>
            <h3 className="text-sm font-bold">Session History</h3>
            <div className="mt-3 space-y-2.5">
              {interviewHistory.slice(0, 4).map(h => (
                <div key={h.id} className={`rounded-xl border p-3 text-xs ${bgSubtle}`}>
                  <div className="flex justify-between font-bold">
                    <span>{h.category}</span>
                    <span className="text-emerald-400">{h.score}/10</span>
                  </div>
                  <p className={`mt-1 text-[11px] ${textMuted}`}>{h.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 7: AI RESUME WRITER & BULLET IMPROVER
// ============================================================================
function ResumeWriterModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  resumeText,
  setResumeText,
  resumeAnalysis,
  userProfile,
  showToast
}) {
  const [rawBullet, setRawBullet] = useState(
    'Made a web app using Python and FastAPI that lets users upload PDF notes and ask questions.'
  );
  const [improvedBullet, setImprovedBullet] = useState(
    'Engineered an AI-powered Document Q&A web application using Python, FastAPI, and React, enabling semantic PDF retrieval with cosine similarity across multi-page study notes.'
  );

  const rewriteBullet = (input) => {
    let text = input.trim().replace(/^[-•*]\s*/, '');
    text = text
      .replace(/^made a\s+/i, 'Engineered a ')
      .replace(/^built a\s+/i, 'Architected and deployed a ')
      .replace(/^worked on\s+/i, 'Spearheaded development of ')
      .replace(/^assisted in\s+/i, 'Collaborated with engineering peers to implement ')
      .replace(/web app/i, 'full-stack web application')
      .replace(/lets users/i, 'enabling users to');

    if (!/[.]$/.test(text)) text += '.';
    if (!/\d+%/.test(text)) {
      text += ' [Tip: Add your measured accuracy, latency, or dataset size here without fabricating metrics]';
    }
    setImprovedBullet(text);
    showToast('Generated ATS-optimized bullet rewrite!');
  };

  const applyBulletToResume = () => {
    const cleanImproved = improvedBullet.replace(/\s*\[Tip:.*?\]/, '');
    if (resumeText.includes(rawBullet.replace(/^[-•*]\s*/, ''))) {
      const updated = resumeText.replace(rawBullet.replace(/^[-•*]\s*/, ''), cleanImproved);
      setResumeText(updated);
      showToast('Replaced bullet point in your active resume!');
    } else {
      setResumeText(`${resumeText}\n- ${cleanImproved}`);
      showToast('Appended enhanced bullet to your active resume!');
    }
  };

  const generatedSummary = `Detail-oriented ${userProfile.degree} (${userProfile.branch}) candidate graduating in ${userProfile.graduationYear}, skilled in ${userProfile.skills
    .slice(0, 6)
    .join(', ')}. Experienced in building end-to-end machine learning pipelines, NLP document retrieval systems, and RESTful backend APIs. Seeking a ${userProfile.targetRole} role to deliver measurable software impact.`;

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border p-6 ${bgSurface}`}>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Module 07 • Ethical AI Resume Studio
        </span>
        <h2 className="mt-1 text-xl font-extrabold">AI Resume Bullet Improver & Summary Generator</h2>
        <p className={`mt-1 text-xs ${textMuted}`}>
          Strengthens passive phrasing with engineering action verbs while strictly preserving your real achievements—zero fabricated metrics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Interactive Bullet Rewriter */}
        <div className={`space-y-4 rounded-2xl border p-6 lg:col-span-7 ${bgSurface}`}>
          <h3 className="text-base font-bold">Side-by-Side Bullet Enhancer</h3>

          {/* Quick Pick from User's Existing Resume Bullets */}
          {resumeAnalysis.bullets.length > 0 && (
            <div>
              <p className={`mb-2 text-xs font-semibold ${textMuted}`}>
                Click any bullet from your active resume to enhance:
              </p>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.bullets.slice(0, 4).map((b, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const clean = b.replace(/^[-•*]\s*/, '');
                      setRawBullet(clean);
                      rewriteBullet(clean);
                    }}
                    className={`max-w-full truncate rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition hover:border-violet-500 ${bgSubtle}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className={`mb-1.5 block text-xs font-semibold ${textMuted}`}>Original Resume Bullet</label>
            <textarea
              rows={3}
              value={rawBullet}
              onChange={e => setRawBullet(e.target.value)}
              className={`w-full rounded-xl border p-3 text-xs outline-none focus:border-violet-500 ${
                darkMode ? 'border-slate-800 bg-slate-950 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            />
          </div>

          <button
            onClick={() => rewriteBullet(rawBullet)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>Rewrite with Strong Action Verbs</span>
          </button>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-emerald-400">
              AI-Enhanced Version (Editable)
            </label>
            <textarea
              rows={3}
              value={improvedBullet}
              onChange={e => setImprovedBullet(e.target.value)}
              className={`w-full rounded-xl border border-emerald-500/30 p-3 text-xs outline-none ${
                darkMode ? 'bg-emerald-950/20 text-slate-100' : 'bg-emerald-50/50 text-slate-900'
              }`}
            />
          </div>

          <button
            onClick={applyBulletToResume}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500"
          >
            <Check className="h-4 w-4" />
            <span>Accept & Apply to Active Resume</span>
          </button>
        </div>

        {/* Tailored Professional Summary */}
        <div className={`space-y-4 rounded-2xl border p-6 lg:col-span-5 ${bgSurface}`}>
          <h3 className="text-base font-bold">Tailored Professional Summary</h3>
          <p className={`text-xs ${textMuted}`}>
            Synthesized from your degree, target role ({userProfile.targetRole}), and verified skills.
          </p>

          <div className={`rounded-xl border p-4 text-xs leading-relaxed ${bgSubtle}`}>
            {generatedSummary}
          </div>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(generatedSummary);
              showToast('Professional summary copied to clipboard!');
            }}
            className="w-full rounded-xl border border-violet-500/40 bg-violet-500/10 py-2.5 text-xs font-semibold text-violet-400 hover:bg-violet-500/20"
          >
            Copy Summary to Clipboard
          </button>

          <div className={`rounded-xl border p-4 text-xs ${bgSubtle}`}>
            <p className="font-bold">High-Impact Engineering Action Verbs</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['Architected', 'Engineered', 'Optimized', 'Automated', 'Deployed', 'Spearheaded', 'Benchmarked', 'Streamlined'].map(
                verb => (
                  <span
                    key={verb}
                    className="rounded-md bg-blue-500/15 px-2 py-0.5 text-[11px] font-semibold text-blue-400"
                  >
                    {verb}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 8: PERSONALIZED CAREER ROADMAP
// ============================================================================
function CareerRoadmapModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  userProfile,
  roadmapDuration,
  setRoadmapDuration,
  completedTasks,
  setCompletedTasks,
  roadmapProgress,
  jobMatchReport,
  showToast
}) {
  const weeks = [
    {
      week: 'Week 1',
      title: 'Core Foundations, Python & SQL Mastery',
      focus: 'Strengthen core data manipulation, SQL joins/indexing, and clean Git workflows.',
      tasks: [
        { id: 'w1-1', text: 'Complete Python OOP, generators, and NumPy/Pandas vectorization drills' },
        { id: 'w1-2', text: 'Solve 15 medium SQL queries (Window functions, CTEs, Group By)' },
        { id: 'w1-3', text: 'Refactor GitHub repositories with clean READMEs and architecture diagrams' }
      ]
    },
    {
      week: 'Week 2',
      title: 'Machine Learning & Statistical Modeling',
      focus: 'Master supervised algorithms, feature engineering, and cross-validation metrics.',
      tasks: [
        { id: 'w2-1', text: 'Review probability distributions, hypothesis testing, and precision-recall curves' },
        { id: 'w2-2', text: 'Implement end-to-end Scikit-learn Pipeline with hyperparameter tuning' },
        { id: 'w2-3', text: 'Solve 20 Arrays, Hashing & Two-Pointer DSA problems' }
      ]
    },
    {
      week: 'Week 3',
      title: `Deep Learning, TensorFlow & ${jobMatchReport.missingSkills[0]?.toUpperCase() || 'NLP'}`,
      focus: 'Close your highest-priority skill gaps identified in the Job Matcher.',
      tasks: [
        { id: 'w3-1', text: 'Build and train a neural network classifier using TensorFlow / Keras' },
        { id: 'w3-2', text: 'Implement text embeddings & semantic cosine similarity search' },
        { id: 'w3-3', text: 'Containerize an inference FastAPI endpoint with Docker basics' }
      ]
    },
    {
      week: 'Week 4',
      title: 'Capstone Deployment & Mock Interviews',
      focus: 'Ship a measurable portfolio project and complete timed interview simulations.',
      tasks: [
        { id: 'w4-1', text: 'Deploy full-stack AI capstone project and add measurable metrics to resume' },
        { id: 'w4-2', text: 'Complete 3 timed mock interviews in CareerPilot Interview Lab' },
        { id: 'w4-3', text: 'Apply to top 5 matched roles in Job Explorer with tailored summaries' }
      ]
    }
  ];

  const toggleTask = (taskId) => {
    const updated = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(updated);
    showToast('Roadmap milestone progress saved!');
  };

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            Module 08 • Adaptive Learning Path
          </span>
          <h2 className="mt-1 text-xl font-extrabold">
            Personalized {roadmapDuration} Roadmap for {userProfile.targetRole}
          </h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Tailored to {userProfile.dailyStudyHours} hrs/day study schedule • Automatically synced with your Dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl border border-slate-700/60 p-1">
            {['30-Day', '60-Day'].map(dur => (
              <button
                key={dur}
                onClick={() => setRoadmapDuration(dur)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  roadmapDuration === dur ? 'bg-violet-600 text-white' : textMuted
                }`}
              >
                {dur} Plan
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-emerald-500/15 px-3.5 py-2 text-xs font-extrabold text-emerald-400">
            {roadmapProgress}% Done
          </div>
        </div>
      </div>

      {/* Weekly Milestone Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {weeks.map(w => {
          const weekDone = w.tasks.filter(t => completedTasks[t.id]).length;
          return (
            <div key={w.week} className={`rounded-2xl border p-6 ${bgSurface}`}>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-bold text-violet-400">
                  {w.week}
                </span>
                <span className={`text-xs font-semibold ${textMuted}`}>
                  {weekDone}/{w.tasks.length} Tasks
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold">{w.title}</h3>
              <p className={`mt-1 text-xs ${textMuted}`}>{w.focus}</p>

              <div className="mt-4 space-y-2.5">
                {w.tasks.map(task => {
                  const checked = Boolean(completedTasks[task.id]);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-xs transition ${
                        checked
                          ? 'border-emerald-500/30 bg-emerald-500/10'
                          : `${bgSubtle} hover:border-violet-500/40`
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          checked
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-500'
                        }`}
                      >
                        {checked && <Check className="h-3 w-3" />}
                      </div>
                      <span className={checked ? 'line-through opacity-75' : ''}>{task.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 9: JOB EXPLORER & APPLICATION TRACKER
// ============================================================================
function JobExplorerModule({
  darkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  resumeText,
  jobApplications,
  setJobApplications,
  showToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const rankedJobs = useMemo(() => {
    return SAMPLE_JOBS.map(job => {
      const match = computeJobMatch(resumeText, `${job.title} ${job.skills.join(' ')} ${job.description}`, job.title);
      return { ...job, matchScore: match.overallMatch };
    })
      .filter(job => {
        const matchesQuery =
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some(s => s.includes(searchQuery.toLowerCase()));
        const matchesType = typeFilter === 'All' || job.type === typeFilter;
        return matchesQuery && matchesType;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [resumeText, searchQuery, typeFilter]);

  const updateAppStatus = (jobId, status) => {
    const next = { ...jobApplications };
    if (next[jobId] === status) {
      delete next[jobId];
      showToast('Removed from tracked jobs');
    } else {
      next[jobId] = status;
      showToast(`Job marked as "${status}"`);
    }
    setJobApplications(next);
  };

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Module 09 • Skill-Ranked Opportunities
          </span>
          <h2 className="mt-1 text-xl font-extrabold">Job Explorer & Application Tracker</h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Curated fresher & internship listings dynamically scored against your active resume skills.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className={`pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 ${textMuted}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search role, skill, company..."
              className={`w-56 rounded-xl border py-2 pl-8 pr-3 text-xs outline-none ${
                darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
              }`}
            />
          </div>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold outline-none ${
              darkMode ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <option value="All">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {rankedJobs.map(job => {
          const appStatus = jobApplications[job.id];
          return (
            <div key={job.id} className={`flex flex-col justify-between rounded-2xl border p-6 ${bgSurface}`}>
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                      {job.type} • {job.experience}
                    </span>
                    <h3 className="mt-2 text-base font-bold">{job.title}</h3>
                    <p className={`text-xs font-medium ${textMuted}`}>
                      {job.company} • {job.location}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-center">
                    <p className="text-sm font-extrabold text-emerald-400">{job.matchScore}%</p>
                    <p className="text-[9px] font-bold uppercase text-emerald-300">Match</p>
                  </div>
                </div>

                <p className={`mt-3 text-xs leading-relaxed ${textMuted}`}>{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills.map(sk => (
                    <span
                      key={sk}
                      className={`rounded-lg border px-2 py-0.5 text-[11px] font-medium capitalize ${bgSubtle}`}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-inherit pt-4">
                <span className="text-xs font-bold text-violet-400">{job.salary}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateAppStatus(job.id, 'Saved')}
                    className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                      appStatus === 'Saved'
                        ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                        : darkMode
                        ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>{appStatus === 'Saved' ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={() => updateAppStatus(job.id, 'Applied')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white transition ${
                      appStatus === 'Applied'
                        ? 'bg-emerald-600'
                        : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-95'
                    }`}
                  >
                    {appStatus === 'Applied' ? 'Applied ✓' : 'Track Apply'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 10: PROFILE & WORKSPACE SETTINGS
// ============================================================================
function ProfileSettingsModule({
  darkMode,
  setDarkMode,
  bgSurface,
  bgSubtle,
  textMuted,
  userProfile,
  setUserProfile,
  setResumeText,
  setResumeFileName,
  showToast,
  setViewMode
}) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!userProfile.skills.includes(newSkill.trim())) {
      setUserProfile({ ...userProfile, skills: [...userProfile.skills, newSkill.trim()] });
      showToast(`Added "${newSkill.trim()}" to profile`);
    }
    setNewSkill('');
  };

  const removeSkill = (sk) => {
    setUserProfile({
      ...userProfile,
      skills: userProfile.skills.filter(s => s !== sk)
    });
  };

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6 ${bgSurface}`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            Module 10 • Student Identity & Preferences
          </span>
          <h2 className="mt-1 text-xl font-extrabold">Profile & Workspace Settings</h2>
          <p className={`mt-1 text-xs ${textMuted}`}>
            Customize your academic profile, target role, and visual preferences.
          </p>
        </div>

        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit to Landing Page</span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className={`space-y-4 rounded-2xl border p-6 lg:col-span-8 ${bgSurface}`}>
          <h3 className="text-base font-bold">Academic & Placement Profile</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Email Address', key: 'email' },
              { label: 'College / University', key: 'college' },
              { label: 'Degree', key: 'degree' },
              { label: 'Branch / Specialization', key: 'branch' },
              { label: 'Graduation Year', key: 'graduationYear' }
            ].map(field => (
              <div key={field.key}>
                <label className={`mb-1 block text-xs font-semibold ${textMuted}`}>{field.label}</label>
                <input
                  type="text"
                  value={userProfile[field.key]}
                  onChange={e => setUserProfile({ ...userProfile, [field.key]: e.target.value })}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium outline-none focus:border-violet-500 ${
                    darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>
            ))}

            <div>
              <label className={`mb-1 block text-xs font-semibold ${textMuted}`}>Target Job Role</label>
              <select
                value={userProfile.targetRole}
                onChange={e => setUserProfile({ ...userProfile, targetRole: e.target.value })}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-semibold outline-none ${
                  darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                }`}
              >
                {Object.keys(ROLE_PROFILES).map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`mb-1 block text-xs font-semibold ${textMuted}`}>Daily Study Hours</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="12"
                value={userProfile.dailyStudyHours}
                onChange={e => setUserProfile({ ...userProfile, dailyStudyHours: Number(e.target.value) })}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium outline-none ${
                  darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                }`}
              />
            </div>
          </div>

          <button
            onClick={() => showToast('Profile preferences saved!')}
            className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white"
          >
            Save Profile Updates
          </button>
        </div>

        {/* Right: Profile Skills & Theme Controls */}
        <div className="space-y-6 lg:col-span-4">
          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <h3 className="text-base font-bold">Core Profile Skills</h3>
            <form onSubmit={addSkill} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. PyTorch)..."
                className={`flex-1 rounded-xl border px-3 py-2 text-xs outline-none ${
                  darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white"
              >
                Add
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {userProfile.skills.map(sk => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-300"
                >
                  <span>{sk}</span>
                  <button onClick={() => removeSkill(sk)} className="hover:text-rose-400">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border p-6 ${bgSurface}`}>
            <h3 className="text-base font-bold">Appearance & Data</h3>
            <div className="mt-4 space-y-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs font-semibold ${bgSubtle}`}
              >
                <span>Interface Theme</span>
                <span className="text-violet-400">{darkMode ? 'Dark Navy' : 'Crisp Light'}</span>
              </button>

              <button
                onClick={() => {
                  setResumeText(SAMPLE_RESUME_TEXT);
                  setResumeFileName('Aarav_Sharma_CS_AI_Resume.pdf');
                  showToast('Workspace reset to default B.Tech CS-AI demo state');
                }}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs font-semibold ${bgSubtle}`}
              >
                <span>Reset Demo Resume</span>
                <RefreshCw className="h-3.5 w-3.5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// AUTHENTICATION MODAL (LOGIN / REGISTER)
// ============================================================================
function AuthModal({ mode, setMode, onClose, userProfile, setUserProfile, onSuccess, darkMode }) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile({ ...userProfile, name: name || 'Student User', email });
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
          darkMode ? 'border-slate-800 bg-[#0F1626] text-white' : 'border-slate-200 bg-white text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold">
              {mode === 'login' ? 'Sign In to CareerPilot AI' : 'Create Student Account'}
            </h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-400">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none ${
                  darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50'
                }`}
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-400">Student Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none ${
                darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50'
              }`}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none ${
                darkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-xs font-bold text-white shadow-lg"
          >
            {mode === 'login' ? 'Enter Placement Workspace' : 'Create Account & Launch'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <>
              New to CareerPilot AI?{' '}
              <button onClick={() => setMode('signup')} className="font-semibold text-violet-400 hover:underline">
                Create Account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="font-semibold text-violet-400 hover:underline">
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}