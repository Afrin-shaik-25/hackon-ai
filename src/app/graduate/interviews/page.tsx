'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessagesSquare,
  Sparkles,
  CheckCircle2,
  Play,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Lightbulb,
  FileCheck,
  Send,
  Loader2
} from 'lucide-react';

interface InterviewQuestion {
  id: number;
  category: string;
  q: string;
  hint: string;
  expectedKeyPoints: string[];
}

const INTERVIEW_POOLS: Record<string, InterviewQuestion[]> = {
  'Junior Full-Stack Engineer': [
    {
      id: 1,
      category: 'Frontend Architecture',
      q: 'How does the React virtual DOM reconciliation algorithm identify which component trees to re-render, and how do unique keys optimize list rendering?',
      hint: 'Discuss Fiber tree diffing, O(N) heuristic comparison, and key stability during list reordering.',
      expectedKeyPoints: ['Fiber nodes', 'Heuristic O(N) diff algorithm', 'Component type matching', 'Unique key stability']
    },
    {
      id: 2,
      category: 'Backend & APIs',
      q: 'Explain how you would design an idempotent RESTful endpoint in a microservices architecture that handles payment processing.',
      hint: 'Discuss idempotency keys in request headers, database unique constraints, and atomic distributed transaction locking.',
      expectedKeyPoints: ['Idempotency-Key header', 'Database unique constraint', 'Atomic deduplication table', 'Safe retry semantics']
    },
    {
      id: 3,
      category: 'State Management',
      q: 'When would you prefer global state management (such as Redux Toolkit or Zustand) over React Context API, and what are the performance trade-offs?',
      hint: 'Consider re-render granularities, selector subscriptions, and Context value reference updates causing whole subtree re-renders.',
      expectedKeyPoints: ['Selective re-rendering via selector hooks', 'Context causes all consumer re-renders', 'DevTools middleware', 'Normalized store shape']
    },
    {
      id: 4,
      category: 'Database Optimization',
      q: 'Explain the internal structure of a B+ Tree index in PostgreSQL or MySQL and how it accelerates range queries compared to hash indexes.',
      hint: 'Mention balanced tree height, leaf node sequential linked lists, and O(log N) traversal.',
      expectedKeyPoints: ['Multi-way balanced search tree', 'Leaf nodes linked sequentially', 'Logarithmic lookup depth', 'Range scan sequential disk IO']
    },
    {
      id: 5,
      category: 'Security & Auth',
      q: 'How do you safeguard a modern Single Page Application against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)?',
      hint: 'Cover HttpOnly cookies, SameSite=Strict attributes, CSP headers, and input sanitization.',
      expectedKeyPoints: ['HttpOnly & Secure cookie flags', 'SameSite=Lax/Strict attribute', 'Content Security Policy (CSP)', 'JSX automatic escaping']
    },
    {
      id: 6,
      category: 'Node.js Internals',
      q: 'Describe the phases of the Node.js Event Loop and explain how libuv handles asynchronous non-blocking I/O operations.',
      hint: 'Explain timers, pending callbacks, poll, check (setImmediate), and the thread pool for fs/crypto tasks.',
      expectedKeyPoints: ['Timers, Poll, Check phases', 'libuv C thread pool', 'Non-blocking system calls (epoll/kqueue)', 'process.nextTick microtask queue']
    },
    {
      id: 7,
      category: 'Web Performance',
      q: 'What strategies do you employ to minimize First Contentful Paint (FCP) and Largest Contentful Paint (LCP) in a Next.js / React application?',
      hint: 'Discuss server-side rendering, dynamic imports / code-splitting, image optimization, and font preloading.',
      expectedKeyPoints: ['Route-based code splitting', 'Next.js Image component optimization', 'Critical CSS inlining', 'Edge CDN caching']
    },
    {
      id: 8,
      category: 'Real-Time Communication',
      q: 'Compare WebSockets and Server-Sent Events (SSE). When is SSE preferable for a real-time dashboard or LLM streaming output?',
      hint: 'Discuss unidirectional vs bidirectional transport, HTTP/2 multiplexing, and reconnection capabilities.',
      expectedKeyPoints: ['SSE is unidirectional HTTP-based', 'Built-in auto reconnection', 'HTTP/2 multiplexing support', 'Ideal for AI token streaming']
    },
    {
      id: 9,
      category: 'DevOps & Containers',
      q: 'Why are Docker multi-stage builds recommended for deploying containerized TypeScript / Node.js applications?',
      hint: 'Mention build dependencies vs production runtime image sizes, security surface minimization, and node_modules pruning.',
      expectedKeyPoints: ['Separates build tools from runtime', 'Reduces container image size significantly', 'Excludes TypeScript compiler & devDependencies', 'Improves deployment pull speed']
    },
    {
      id: 10,
      category: 'Networking & Protocols',
      q: 'What triggers a CORS preflight OPTIONS request in modern browsers, and how should an API server respond?',
      hint: 'Explain simple requests vs non-simple headers (e.g. Authorization, application/json) and Access-Control-Allow-Origin headers.',
      expectedKeyPoints: ['Custom headers or JSON content-type', 'Browser OPTIONS preflight check', 'Access-Control-Allow-Origin & Methods headers', 'Access-Control-Max-Age caching']
    },
    {
      id: 11,
      category: 'TypeScript Typing',
      q: 'Explain the difference between `interface` and `type` in TypeScript, and give an example of mapped or conditional types.',
      hint: 'Discuss declaration merging with interfaces versus unions, intersections, and conditional types like Pick<T, K>.',
      expectedKeyPoints: ['Interface declaration merging', 'Type aliases support union/intersection primitives', 'Mapped types with in keyof', 'Conditional types with ternary']
    },
    {
      id: 12,
      category: 'Caching Architectures',
      q: 'Explain the Cache-Aside (Lazy Loading) pattern using Redis and how you handle cache stampede and stale data.',
      hint: 'Mention application reads cache first, fetches DB on miss, writes back with TTL, and mutex locks.',
      expectedKeyPoints: ['Read cache -> on miss query DB and update cache', 'TTL for automated expiration', 'Probabilistic early expiration', 'Mutex locks on cold cache']
    },
    {
      id: 13,
      category: 'Testing Best Practices',
      q: 'How do you structure the testing pyramid across Unit Tests, Integration Tests, and End-to-End (E2E) tests in a web app?',
      hint: 'Describe Jest/Vitest for unit logic, supertest/React Testing Library for integration, and Playwright for E2E user flows.',
      expectedKeyPoints: ['Fast unit tests for pure domain logic', 'Component and API integration tests', 'Targeted E2E tests for core user journeys', 'Mocking external dependencies']
    },
    {
      id: 14,
      category: 'Data Integrity',
      q: 'What are ACID properties in relational databases, and what problems do database isolation levels solve?',
      hint: 'Define Atomicity, Consistency, Isolation, Durability; mention Dirty Reads, Non-repeatable Reads, and Phantom Reads.',
      expectedKeyPoints: ['Atomicity all-or-nothing', 'Isolation levels (Read Committed, Repeatable Read)', 'Durability via WAL logs', 'Phantom read prevention']
    },
    {
      id: 15,
      category: 'System Design',
      q: 'How would you architect a distributed URL shortening service (like Bitly) capable of generating 100M URLs per day?',
      hint: 'Discuss Base62 encoding, pre-generated unique key token ranges, Redis caching layer, and horizontal scaling.',
      expectedKeyPoints: ['Base62 encoding of 64-bit integer', 'Distributed unique ID generator / ZooKeeper token ranges', 'Redis LRU cache for 80/20 read workload', 'Database horizontal partitioning']
    },
    {
      id: 16,
      category: 'Behavioral & Engineering Ethics',
      q: 'Describe a situation where a critical production bug occurred due to unexpected edge-case inputs. How did you triage, resolve, and prevent recurrence?',
      hint: 'Follow the STAR method (Situation, Task, Action, Result) with post-mortem documentation and regression test addition.',
      expectedKeyPoints: ['Immediate rollback / mitigation', 'Root cause analysis without blame', 'Regression automated test creation', 'Comprehensive post-mortem share']
    }
  ],
  'Associate Data Scientist': [
    {
      id: 1,
      category: 'Model Fundamentals',
      q: 'Explain the bias-variance tradeoff and how L1 (Lasso) and L2 (Ridge) regularization help prevent model overfitting.',
      hint: 'Discuss model complexity, underfitting high bias, overfitting high variance, and penalty coefficients on weight vectors.',
      expectedKeyPoints: ['Bias is error from erroneous assumptions', 'Variance is sensitivity to training fluctuations', 'L1 yields sparse feature selection', 'L2 shrinks weights toward zero']
    },
    {
      id: 2,
      category: 'Evaluation Metrics',
      q: 'Why is accuracy a misleading metric for highly imbalanced datasets (e.g. 99% negative classes)? What metrics should you rely on instead?',
      hint: 'Explain precision, recall, F1-score, PR-AUC, and ROC-AUC curves.',
      expectedKeyPoints: ['Accuracy paradox in minority classes', 'Precision: true positives over predicted positives', 'Recall: true positives over actual positives', 'PR-AUC over ROC-AUC for severe skew']
    },
    {
      id: 3,
      category: 'Feature Engineering',
      q: 'When should you choose Standardization (Z-score) versus Normalization (Min-Max Scaling), and which algorithms are sensitive to feature scales?',
      hint: 'Discuss algorithms using Euclidean distances (KNN, SVM, K-Means) and Gradient Descent versus tree-based models.',
      expectedKeyPoints: ['Min-Max maps to [0,1] bounded range', 'Z-score handles normal distribution with outliers', 'Distance algorithms (KNN, SVM, K-means) sensitive', 'Tree models invariant to scale']
    },
    {
      id: 4,
      category: 'Optimization Algorithms',
      q: 'How does the Adam optimizer combine the advantages of Momentum and RMSProp in deep learning model training?',
      hint: 'Explain moving average of past gradients (momentum) and squared gradients (adaptive learning rates).',
      expectedKeyPoints: ['First moment estimate (exponential moving average of gradients)', 'Second moment estimate (uncentered variance)', 'Bias correction for zero initialization', 'Adaptive per-parameter learning rate']
    },
    {
      id: 5,
      category: 'Ensemble Learning',
      q: 'Explain the algorithmic distinction between Bagging (Random Forest) and Boosting (XGBoost, LightGBM).',
      hint: 'Explain parallel independent weak learners vs sequential residual fitting with weighted errors.',
      expectedKeyPoints: ['Bagging trains trees in parallel on bootstrap samples', 'Bagging primarily reduces variance', 'Boosting sequentially fits residuals of prior trees', 'Boosting primarily reduces bias']
    },
    {
      id: 6,
      category: 'Deep Learning & NLP',
      q: 'Explain the Scaled Dot-Product Attention mechanism in Transformers and why the scaling factor (1/√d_k) is necessary.',
      hint: 'Discuss Query, Key, Value matrices, matrix multiplication, softmax saturation, and gradient vanishing.',
      expectedKeyPoints: ['Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V', 'Large d_k pushes dot products into small softmax gradients', 'Scaling prevents gradient vanishing', 'Permits parallelized sequence modeling']
    },
    {
      id: 7,
      category: 'Handling Missing Data',
      q: 'What are the assumptions and consequences of MCAR, MAR, and MNAR missing data mechanisms?',
      hint: 'Explain Missing Completely at Random, Missing at Random, and Missing Not at Random, plus imputation strategies.',
      expectedKeyPoints: ['MCAR is unrelated to any observed or unobserved data', 'MAR depends on observed covariates', 'MNAR requires modeling the missingness mechanism', 'KNN/MICE imputation vs simple mean']
    },
    {
      id: 8,
      category: 'Clustering & Unsupervised',
      q: 'How does K-Means choose initial cluster centroids to avoid suboptimal local minima (K-Means++), and how do you evaluate cluster quality?',
      hint: 'Discuss probabilistic distance-weighted initialization and the Silhouette Score / Elbow method.',
      expectedKeyPoints: ['K-Means++ spreads centroids proportional to squared distance', 'Elbow method via WCSS (Inertia)', 'Silhouette score measures cohesion vs separation', 'Vulnerability to non-spherical clusters']
    },
    {
      id: 9,
      category: 'Dimensionality Reduction',
      q: 'How does Principal Component Analysis (PCA) identify orthogonal directions of maximum variance in high-dimensional spaces?',
      hint: 'Discuss covariance matrix calculation, eigenvectors, eigenvalues, and projection to lower dimensions.',
      expectedKeyPoints: ['Centered feature covariance matrix', 'Eigen decomposition / SVD', 'Eigenvalues reflect explained variance', 'Orthogonal projection reduces multicollinearity']
    },
    {
      id: 10,
      category: 'Model Validation',
      q: 'Why is standard K-Fold cross validation inappropriate for time series forecasting, and what validation strategy should you use?',
      hint: 'Discuss data leakage, temporal lookahead bias, and Purged TimeSeriesSplit (Walk-Forward validation).',
      expectedKeyPoints: ['Future data leaking into past model training', 'TimeSeriesSplit rolling window / expanding window', 'Embargo period between train and test', 'Maintains temporal order integrity']
    },
    {
      id: 11,
      category: 'LLMs & Modern GenAI',
      q: 'Compare Fine-Tuning a Large Language Model with Retrieval-Augmented Generation (RAG) for domain-specific enterprise search.',
      hint: 'Discuss hallucination rates, knowledge freshness, vector database chunking, and computational cost.',
      expectedKeyPoints: ['RAG injects verified dynamic context into prompt', 'RAG avoids expensive retraining for knowledge updates', 'Fine-tuning is better for stylistic/format adaptation', 'Vector embeddings & hybrid BM25 search']
    },
    {
      id: 12,
      category: 'MLOps & Deployment',
      q: 'What is Concept Drift versus Data Drift, and how do you detect and monitor both in production ML pipelines?',
      hint: 'Explain changes in P(Y|X) vs P(X), Kolmogorov-Smirnov test, Population Stability Index (PSI), and automated retraining triggers.',
      expectedKeyPoints: ['Data drift: input feature distribution P(X) shifts', 'Concept drift: relationship P(Y|X) changes', 'KS test / PSI statistical drift detection', 'Automated model retraining triggers']
    },
    {
      id: 13,
      category: 'Convolutional Networks',
      q: 'Why are convolutional layers more parameter-efficient than fully connected dense layers for image processing?',
      hint: 'Discuss spatial local connectivity, parameter weight sharing, and translation invariance.',
      expectedKeyPoints: ['Local receptive fields', 'Weight sharing across spatial dimensions', 'Translation equivariance', 'Significant reduction in parameter count']
    },
    {
      id: 14,
      category: 'Statistical Hypothesis Testing',
      q: 'In an A/B testing scenario, explain Type I vs Type II errors, p-values, and statistical power.',
      hint: 'Discuss false positives (alpha), false negatives (beta), sample size calculations, and Minimum Detectable Effect (MDE).',
      expectedKeyPoints: ['Type I error: false positive rejecting true null', 'Type II error: false negative failing to reject false null', 'P-value is probability under null hypothesis', 'Power (1 - beta) requires sufficient sample size']
    },
    {
      id: 15,
      category: 'System Design for ML',
      q: 'Design a real-time recommendation system pipeline for an e-commerce platform with 10M active users.',
      hint: 'Discuss candidate generation (Two-Tower embeddings), candidate ranking (GBDT/DeepFM), and real-time feature store (Feast/Redis).',
      expectedKeyPoints: ['Candidate retrieval (ANN vector search top 1000)', 'Heavy ranking model (deep neural network top 50)', 'Low-latency Redis feature store', 'Business logic filtering & deduplication']
    },
    {
      id: 16,
      category: 'AI Ethics & Governance',
      q: 'How do you test and mitigate algorithmic bias in predictive models used for university admissions or recruitment scoring?',
      hint: 'Discuss demographic parity, disparate impact ratios, equalized odds, and adversarial debiasing.',
      expectedKeyPoints: ['Audit disparate impact ratio across protected classes', 'Equalized odds vs demographic parity tradeoffs', 'Preprocessing re-weighting or adversarial training', 'Explainability tools (SHAP, LIME)']
    }
  ]
};

export default function GraduateInterviewsPage() {
  const [role, setRole] = useState<'Junior Full-Stack Engineer' | 'Associate Data Scientist'>('Junior Full-Stack Engineer');
  const [started, setStarted] = useState<boolean>(false);
  const [qIdx, setQIdx] = useState<number>(0);
  const [answerText, setAnswerText] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Record<number, { score: number; feedback: string; strengths: string[]; missing: string[] }>>({});
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const activeQuestions = INTERVIEW_POOLS[role] || INTERVIEW_POOLS['Junior Full-Stack Engineer'];
  const currentQ = activeQuestions[qIdx];

  const handleStart = () => {
    setStarted(true);
    setQIdx(0);
    setAnswerText('');
    setUserAnswers({});
    setEvaluations({});
    setCompleted(false);
  };

  const handleEvaluateAndNext = () => {
    if (!answerText.trim()) return;

    setEvaluating(true);

    // Save answer
    setUserAnswers((prev) => ({ ...prev, [qIdx]: answerText.trim() }));

    // Real-time evaluation heuristic comparing candidate keywords against rubric key points
    const textLower = answerText.toLowerCase();
    const matchedPoints = currentQ.expectedKeyPoints.filter((kp) =>
      kp.toLowerCase().split(' ').some((word) => word.length > 3 && textLower.includes(word))
    );
    const matchRatio = matchedPoints.length / currentQ.expectedKeyPoints.length;
    const computedScore = Math.min(10, Math.max(5, Math.round(matchRatio * 5 + 4 + (answerText.length > 150 ? 1 : 0))));

    const missingPoints = currentQ.expectedKeyPoints.filter((kp) => !matchedPoints.includes(kp));

    const evalResult = {
      score: computedScore,
      feedback: computedScore >= 8
        ? 'Outstanding response with comprehensive system insight, addressing both foundational mechanics and trade-offs.'
        : computedScore >= 6
        ? 'Solid conceptual answer. Consider expanding on edge-case scenarios, performance implications, and concrete architectural trade-offs.'
        : 'Acceptable preliminary answer, but missed core low-level mechanics and standard engineering terminology.',
      strengths: matchedPoints.length > 0 ? matchedPoints : ['Good high-level overview'],
      missing: missingPoints.length > 0 ? missingPoints : ['None - Excellent depth!']
    };

    setEvaluations((prev) => ({ ...prev, [qIdx]: evalResult }));
    setEvaluating(false);

    if (qIdx < activeQuestions.length - 1) {
      setQIdx(qIdx + 1);
      setAnswerText(userAnswers[qIdx + 1] || '');
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (qIdx > 0) {
      setQIdx(qIdx - 1);
      setAnswerText(userAnswers[qIdx - 1] || '');
    }
  };

  // Average session score
  const totalScore = Object.values(evaluations).reduce((acc, curr) => acc + curr.score, 0);
  const avgScore = Object.keys(evaluations).length > 0
    ? (totalScore / Object.keys(evaluations).length).toFixed(1)
    : '0';

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mock Interview Simulator</h1>
            <p className="text-xs text-slate-500 mt-1">
              Comprehensive technical screening rounds &mdash; 16 in-depth questions per session with architectural feedback
            </p>
          </div>

          <Badge variant="indigo">16 Questions / Session Track</Badge>
        </div>

        {/* Not started view */}
        {!started && !completed && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-900">Select Target Role &amp; Interview Track</CardTitle>
              <CardDescription className="text-xs">
                Comprehensive multi-question interview sessions modeled after top engineering hiring standards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">Select Interview Role Track:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as typeof role)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white cursor-pointer text-xs font-semibold text-slate-800"
                >
                  <option value="Junior Full-Stack Engineer">
                    Junior Full-Stack Engineer Track (React, Node.js, Systems &amp; DB) &mdash; 16 Questions
                  </option>
                  <option value="Associate Data Scientist">
                    Associate Data Scientist Track (Machine Learning, PyTorch, Statistics &amp; MLOps) &mdash; 16 Questions
                  </option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 space-y-2">
                <p className="font-bold text-slate-800">Interview Session Protocol:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>16 In-Depth Technical Questions:</strong> Covers fundamentals, concurrency, system design, databases, and trade-offs.</li>
                  <li><strong>Structured Text Responses:</strong> Formulate complete technical explanations with trade-offs and real-world considerations.</li>
                  <li><strong>Instant Architectural Rubric:</strong> Checks your response against standard engineering criteria and suggests missing key points.</li>
                  <li><strong>Progress &amp; Score Tracking:</strong> Track answered count and receive a complete debrief upon finishing all 16 questions.</li>
                </ul>
              </div>

              <Button variant="primary" onClick={handleStart} className="gap-2 text-xs bg-indigo-600 text-white">
                <Play className="w-4 h-4" />
                <span>Begin 16-Question Technical Session</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* In-progress interview session */}
        {started && !completed && (
          <Card className="border-indigo-200">
            <CardHeader className="bg-indigo-50/50 pb-4 border-b border-indigo-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" className="font-mono text-[10px]">
                    {currentQ.category}
                  </Badge>
                  <span className="text-xs font-bold text-indigo-900">
                    Question {qIdx + 1} of {activeQuestions.length} &bull; {role}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Progress: {Object.keys(userAnswers).length}/{activeQuestions.length} Answered
                  </span>
                  <div className="w-28 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${(qIdx / activeQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-5 text-xs">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 leading-relaxed">
                  {currentQ.q}
                </h3>
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-start gap-2 text-[11px]">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Architectural Hint: </span>
                    <span>{currentQ.hint}</span>
                  </div>
                </div>
              </div>

              {/* Candidate response textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700">Your Structured Answer:</label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {answerText.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Formulate your detailed response here. Mention specific algorithms, data structures, trade-offs, and production considerations..."
                  rows={6}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-indigo-500 leading-relaxed font-sans"
                />
              </div>

              {/* Previous evaluation if already evaluated */}
              {evaluations[qIdx] && (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Evaluated Score: {evaluations[qIdx].score} / 10
                    </span>
                    <Badge variant="success">Analyzed</Badge>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{evaluations[qIdx].feedback}</p>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={qIdx === 0}
                  className="text-xs gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleEvaluateAndNext}
                  disabled={!answerText.trim() || evaluating}
                  className="text-xs bg-indigo-600 text-white gap-1.5"
                >
                  {evaluating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Evaluating Answer...</span>
                    </>
                  ) : (
                    <>
                      <span>{qIdx === activeQuestions.length - 1 ? 'Finish & Generate Debrief' : 'Save & Next Question'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Debrief summary view upon completing 16 questions */}
        {completed && (
          <div className="space-y-6 animate-in fade-in">
            <Card className="border-indigo-200">
              <CardHeader className="bg-indigo-50/60 pb-5 text-center">
                <Award className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                <CardTitle className="text-xl font-bold text-slate-900">
                  Technical Screening Debrief &mdash; {role}
                </CardTitle>
                <CardDescription className="text-xs">
                  Full 16-question evaluation breakdown and career readiness index
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto text-center">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-400 text-[11px]">Questions Completed</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">16 / 16</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-400 text-[11px]">Average Score</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-0.5">{avgScore} / 10</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-400 text-[11px]">Readiness Level</p>
                    <p className="text-base font-bold text-emerald-600 mt-1">
                      {Number(avgScore) >= 7.5 ? 'Industry Ready' : 'Competent'}
                    </p>
                  </div>
                </div>

                {/* Per-question review cards */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-800 text-sm">Question-by-Question Evaluation Summary:</h4>
                  <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                    {activeQuestions.map((q, idx) => {
                      const ev = evaluations[idx];
                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">
                              Q{idx + 1}: {q.category}
                            </span>
                            <Badge variant={ev && ev.score >= 7 ? 'success' : 'warning'}>
                              Score: {ev ? ev.score : 'N/A'}/10
                            </Badge>
                          </div>
                          <p className="text-slate-700 font-medium">{q.q}</p>
                          {userAnswers[idx] && (
                            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px]">
                              <span className="font-semibold text-slate-800">Your Answer: </span>
                              <span>{userAnswers[idx]}</span>
                            </div>
                          )}
                          {ev && (
                            <p className="text-indigo-800 text-[11px]">
                              <strong>Evaluator Feedback:</strong> {ev.feedback}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <Button variant="outline" size="sm" onClick={handleStart} className="text-xs gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Mock Interview</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
