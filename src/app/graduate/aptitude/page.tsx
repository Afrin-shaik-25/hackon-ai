'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, CheckCircle2, XCircle, Clock, Play, ArrowRight, RotateCcw, Award, ChevronRight, Check } from 'lucide-react';

interface AptitudeQuestion {
  id: number;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

// 10 questions per set across categories
const APTITUDE_SETS: Record<string, Record<number, AptitudeQuestion[]>> = {
  Quant: {
    1: [
      {
        id: 1,
        q: "A train running at 54 km/hr takes 20 seconds to pass a railway platform. If the length of the train is 120 metres, what is the length of the platform?",
        options: ["180 metres", "200 metres", "240 metres", "300 metres"],
        correct: 0,
        explanation: "Speed in m/s = 54 × (5/18) = 15 m/s. Total distance = speed × time = 15 × 20 = 300 m. Platform length = 300 - 120 = 180 metres."
      },
      {
        id: 2,
        q: "A and B can complete a work in 12 days and 18 days respectively. They work together for 4 days, then A leaves. How many days will B take to complete the remaining work?",
        options: ["8 days", "10 days", "12 days", "14 days"],
        correct: 1,
        explanation: "In 1 day, (A + B)'s work = 1/12 + 1/18 = 5/36. In 4 days, work done = 4 × 5/36 = 20/36 = 5/9. Remaining work = 4/9. Time taken by B = (4/9) / (1/18) = (4/9) × 18 = 8 days... wait, (4/9) / (1/18) = 8 days. Option: 8 days."
      },
      {
        id: 3,
        q: "If the cost price of 15 articles is equal to the selling price of 12 articles, what is the gain percentage?",
        options: ["20%", "25%", "30%", "33.33%"],
        correct: 1,
        explanation: "Let CP of 1 article = $1. CP of 15 articles = $15. SP of 12 articles = $15. SP of 1 article = 15/12 = 1.25. Gain = 0.25 on 1.00 = 25%."
      },
      {
        id: 4,
        q: "A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times itself at the same rate?",
        options: ["10 years", "12 years", "15 years", "20 years"],
        correct: 2,
        explanation: "SI in 5 years = P. Rate R = (P × 100) / (P × 5) = 20%. To become 4 times, SI needed = 3P. Time T = (3P × 100) / (P × 20) = 15 years."
      },
      {
        id: 5,
        q: "Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?",
        options: ["10 minutes", "12 minutes", "15 minutes", "18 minutes"],
        correct: 1,
        explanation: "Net rate = 1/20 + 1/30 = (3+2)/60 = 5/60 = 1/12. Thus it takes 12 minutes."
      },
      {
        id: 6,
        q: "The average age of a class of 30 students is 15 years. If the teacher's age is included, the average age increases by 1 year. What is the teacher's age?",
        options: ["42 years", "44 years", "46 years", "48 years"],
        correct: 2,
        explanation: "Total age of 30 students = 30 × 15 = 450. Total age with teacher (31 people) = 31 × 16 = 496. Teacher's age = 496 - 450 = 46 years."
      },
      {
        id: 7,
        q: "What is the probability of getting a sum of 9 when two fair dice are thrown simultaneously?",
        options: ["1/9", "1/8", "1/6", "1/12"],
        correct: 0,
        explanation: "Pairs yielding sum 9: (3,6), (4,5), (5,4), (6,3) = 4 outcomes out of 36 total. 4/36 = 1/9."
      },
      {
        id: 8,
        q: "A car covers a distance of 450 km in 6 hours. If its speed is decreased by 15 km/hr, how much time will it take to cover the same distance?",
        options: ["7 hours", "7.5 hours", "8 hours", "8.5 hours"],
        correct: 1,
        explanation: "Original speed = 450 / 6 = 75 km/hr. New speed = 75 - 15 = 60 km/hr. New time = 450 / 60 = 7.5 hours."
      },
      {
        id: 9,
        q: "In how many different ways can the letters of the word 'LEADER' be arranged?",
        options: ["120", "360", "720", "240"],
        correct: 1,
        explanation: "The word LEADER has 6 letters with 'E' repeating twice. Total permutations = 6! / 2! = 720 / 2 = 360."
      },
      {
        id: 10,
        q: "Find the compound interest on $10,000 for 2 years at 10% per annum compounded annually.",
        options: ["$2,000", "$2,100", "$2,200", "$2,250"],
        correct: 1,
        explanation: "Amount = 10000 × (1 + 0.10)^2 = 10000 × 1.21 = 12,100. CI = 12,100 - 10,000 = $2,100."
      }
    ],
    2: [
      {
        id: 11,
        q: "The ratio of boys to girls in a college is 5:3. If 50 boys leave and 50 girls join, the ratio becomes 9:7. How many boys were there initially?",
        options: ["400", "500", "600", "750"],
        correct: 1,
        explanation: "Let boys = 5x, girls = 3x. (5x - 50)/(3x + 50) = 9/7. 7(5x - 50) = 9(3x + 50) => 35x - 350 = 27x + 450 => 8x = 800 => x = 100. Boys = 5 × 100 = 500."
      },
      {
        id: 12,
        q: "A person sells an article at a 10% loss. Had he sold it for $90 more, he would have gained 5%. What is the cost price?",
        options: ["$500", "$600", "$700", "$800"],
        correct: 1,
        explanation: "Difference in percentages = 5% - (-10%) = 15%. 15% of CP = $90 => CP = (90 / 15) × 100 = $600."
      },
      {
        id: 13,
        q: "A boat travels 24 km downstream in 2 hours and takes 4 hours to travel the same distance upstream. What is the speed of the water current?",
        options: ["2 km/hr", "3 km/hr", "4 km/hr", "5 km/hr"],
        correct: 1,
        explanation: "Downstream speed = 24/2 = 12 km/hr. Upstream speed = 24/4 = 6 km/hr. Current speed = (12 - 6)/2 = 3 km/hr."
      },
      {
        id: 14,
        q: "The diagonal of a square is 10√2 cm. What is its perimeter?",
        options: ["20 cm", "40 cm", "60 cm", "80 cm"],
        correct: 1,
        explanation: "Side of square a = diagonal / √2 = 10√2 / √2 = 10 cm. Perimeter = 4 × 10 = 40 cm."
      },
      {
        id: 15,
        q: "If log10(x) + log10(5) = 2, what is the value of x?",
        options: ["10", "20", "25", "50"],
        correct: 1,
        explanation: "log10(5x) = 2 => 5x = 10^2 = 100 => x = 20."
      },
      {
        id: 16,
        q: "A merchant marks his goods 40% above the cost price and allows a discount of 25%. What is his profit percentage?",
        options: ["5%", "8%", "10%", "12%"],
        correct: 0,
        explanation: "Let CP = 100. Marked Price = 140. SP = 140 × 0.75 = 105. Profit = 105 - 100 = 5%."
      },
      {
        id: 17,
        q: "What is the units digit in the expansion of 7^105?",
        options: ["1", "3", "7", "9"],
        correct: 2,
        explanation: "Cyclicity of power of 7 is 4 (7, 9, 3, 1). 105 mod 4 = 1. Therefore unit digit is 7^1 = 7."
      },
      {
        id: 18,
        q: "In an examination, 70% of students passed in English, 65% in Mathematics, and 25% failed in both. If 3000 students passed in both, find the total number of students.",
        options: ["4,000", "5,000", "6,000", "7,500"],
        correct: 1,
        explanation: "Passed in at least one = 100 - 25 = 75%. Passed in both = 70 + 65 - 75 = 60%. 60% of total = 3000 => Total = 3000 / 0.6 = 5000."
      },
      {
        id: 19,
        q: "A sum of money invested at compound interest doubles in 3 years. In how many years will it become 8 times itself?",
        options: ["6 years", "9 years", "12 years", "15 years"],
        correct: 1,
        explanation: "8 = 2^3. Time = 3 × 3 = 9 years."
      },
      {
        id: 20,
        q: "Find the HCF of 2/3, 8/9, 64/81, and 10/27.",
        options: ["2/81", "2/3", "160/3", "160/81"],
        correct: 0,
        explanation: "HCF of fractions = HCF(numerators) / LCM(denominators). HCF(2,8,64,10) = 2. LCM(3,9,81,27) = 81. HCF = 2/81."
      }
    ]
  },
  Logical: {
    1: [
      {
        id: 21,
        q: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
        options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"],
        correct: 1,
        explanation: "This is a simple division series; each number is one-half of the previous number: 1/4 ÷ 2 = 1/8."
      },
      {
        id: 22,
        q: "SCD, TEF, UGH, ____, WKL. What should fill the blank?",
        options: ["CMN", "UJI", "VIJ", "IJT"],
        correct: 2,
        explanation: "The first letters are alphabetical: S, T, U, V, W. The second letters are C, E, G, I, K. The third are D, F, H, J, L. Result: VIJ."
      },
      {
        id: 23,
        q: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
        options: ["Brother", "Uncle", "Cousin", "Father"],
        correct: 3,
        explanation: "The only son of Suresh's mother is Suresh himself. So the boy is the son of Suresh. Thus Suresh is his Father."
      },
      {
        id: 24,
        q: "Statements: All mangoes are golden. No golden things are cheap. Conclusion I: All mangoes are cheap. Conclusion II: Golden things are not mangoes.",
        options: ["Only I follows", "Only II follows", "Neither I nor II follows", "Both follow"],
        correct: 2,
        explanation: "Since all mangoes are golden and no golden things are cheap, mangoes cannot be cheap (I fails). Also mangoes ARE golden things (II fails). Neither follows."
      },
      {
        id: 25,
        q: "If in a certain code, MONKEY is coded as XDJMNL, how will TIGER be coded in that language?",
        options: ["QDFHS", "SDFHQ", "QDFHR", "UJHFS"],
        correct: 0,
        explanation: "Each letter is shifted by -1 and reversed: Y-1=X, E-1=D, K-1=J, N-1=M, O-1=N, M-1=L. For TIGER: R-1=Q, E-1=D, G-1=F, I-1=H, T-1=S => QDFHS."
      },
      {
        id: 26,
        q: "A man walks 5 km East, turns right and walks 4 km, then turns left and walks 5 km. In which direction is he now from his starting point?",
        options: ["North-East", "South-East", "North-West", "South-West"],
        correct: 1,
        explanation: "He moved 10 km East and 4 km South. He is in the South-East quadrant from start."
      },
      {
        id: 27,
        q: "Find the odd one out: 3, 5, 11, 14, 17, 21",
        options: ["14", "21", "17", "11"],
        correct: 0,
        explanation: "All numbers in the sequence are odd except 14, which is an even composite number."
      },
      {
        id: 28,
        q: "In a row of trees, one tree is the 7th from either end of the row. How many trees are in the row?",
        options: ["11", "13", "14", "15"],
        correct: 1,
        explanation: "Total = (Left + Right) - 1 = (7 + 7) - 1 = 13 trees."
      },
      {
        id: 29,
        q: "If '+' means 'divided by', '-' means 'multiplied by', '×' means 'minus' and '÷' means 'plus', calculate: 8 + 2 - 3 × 4 ÷ 6 = ?",
        options: ["10", "12", "14", "16"],
        correct: 2,
        explanation: "Substitute operations: 8 ÷ 2 × 3 - 4 + 6 = 4 × 3 - 4 + 6 = 12 - 4 + 6 = 14."
      },
      {
        id: 30,
        q: "Cup is to Coffee as Bowl is to:",
        options: ["Dish", "Soup", "Spoon", "Food"],
        correct: 1,
        explanation: "Coffee is consumed from a cup, and soup is consumed from a bowl."
      }
    ]
  },
  Verbal: {
    1: [
      {
        id: 31,
        q: "Choose the word most nearly OPPOSITE in meaning to 'AMBIGUOUS':",
        options: ["Complicated", "Lucid", "Concealed", "Vague"],
        correct: 1,
        explanation: "Ambiguous means unclear or having double meanings; lucid means clearly expressed and transparent."
      },
      {
        id: 32,
        q: "Choose the correct spelling:",
        options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
        correct: 2,
        explanation: "The correct spelling has double 'c' and double 'm': ACCOMMODATE."
      },
      {
        id: 33,
        q: "Complete the sentence: 'The committee members could not agree, so the proposal was _____ until next month.'",
        options: ["deferred", "expedited", "implemented", "ignited"],
        correct: 0,
        explanation: "Deferred means postponed or put off to a later date."
      },
      {
        id: 34,
        q: "Identify the grammatical error: 'Neither the teacher (A) nor the students (B) was present (C) at the seminar (D).'",
        options: ["Part A", "Part B", "Part C", "Part D"],
        correct: 2,
        explanation: "When using 'neither... nor', the verb agrees with the closer subject ('the students' is plural, so it must be 'were present', not 'was present')."
      },
      {
        id: 35,
        q: "Choose the word closest in meaning to 'PRAGMATIC':",
        options: ["Idealistic", "Practical", "Theoretical", "Arrogant"],
        correct: 1,
        explanation: "Pragmatic means dealing with things sensibly and realistically in a practical manner."
      },
      {
        id: 36,
        q: "Select the sentence with correct punctuation:",
        options: [
          "It's raining outside, however we decided to go for a run.",
          "It's raining outside; however, we decided to go for a run.",
          "Its raining outside; however we decided to go for a run.",
          "It's raining outside however; we decided to go for a run."
        ],
        correct: 1,
        explanation: "Independent clauses joined by 'however' require a semicolon before and comma after: '...outside; however, we...'."
      },
      {
        id: 37,
        q: "Choose the idiom meaning 'to face a difficult situation with courage':",
        options: ["Bite the bullet", "Break the ice", "Burn bridges", "Bark up the wrong tree"],
        correct: 0,
        explanation: "'Bite the bullet' means to face an inevitable grim situation with fortitude."
      },
      {
        id: 38,
        q: "Change into passive voice: 'The software engineer built a fault-tolerant microservice.'",
        options: [
          "A fault-tolerant microservice has been built by the software engineer.",
          "A fault-tolerant microservice was built by the software engineer.",
          "A fault-tolerant microservice is built by the software engineer.",
          "A fault-tolerant microservice had built by the software engineer."
        ],
        correct: 1,
        explanation: "Simple past active 'built' converts to simple past passive 'was built'."
      },
      {
        id: 39,
        q: "One who knows many foreign languages is called a:",
        options: ["Polyglot", "Philanthropist", "Polymath", "Pedant"],
        correct: 0,
        explanation: "A polyglot is a person who knows and uses several languages."
      },
      {
        id: 40,
        q: "Choose the correct preposition: 'She has been suffering _____ a fever since last Monday.'",
        options: ["from", "with", "by", "of"],
        correct: 0,
        explanation: "The standard collocation is 'suffering from' an ailment."
      }
    ]
  }
};

export default function GraduateAptitudePage() {
  const [selectedCat, setSelectedCat] = useState<'Quant' | 'Logical' | 'Verbal'>('Quant');
  const [currentSetNum, setCurrentSetNum] = useState<number>(1);
  const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Get active 10 questions
  const catSets = APTITUDE_SETS[selectedCat] || APTITUDE_SETS['Quant'];
  const currentQuestions = catSets[currentSetNum] || catSets[1];
  const currentQ = currentQuestions[currentQIndex];

  const handleStartSet = () => {
    setActiveQuiz(true);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setQuizFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOpt(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({ ...prev, [currentQIndex]: selectedOpt }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < currentQuestions.length - 1) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      setSelectedOpt(userAnswers[nextIdx] !== undefined ? userAnswers[nextIdx] : null);
      setIsAnswerSubmitted(userAnswers[nextIdx] !== undefined);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      const prevIdx = currentQIndex - 1;
      setCurrentQIndex(prevIdx);
      setSelectedOpt(userAnswers[prevIdx] !== undefined ? userAnswers[prevIdx] : null);
      setIsAnswerSubmitted(true);
    }
  };

  const handleNextSet = () => {
    const nextSet = currentSetNum === 1 && catSets[2] ? 2 : 1;
    setCurrentSetNum(nextSet);
    handleStartSet();
  };

  // Calculate score
  const score = Object.entries(userAnswers).reduce((acc, [qIdxStr, chosen]) => {
    const q = currentQuestions[Number(qIdxStr)];
    return acc + (q && q.correct === chosen ? 1 : 0);
  }, 0);

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Aptitude &amp; Reasoning Practice</h1>
            <p className="text-xs text-slate-500 mt-1">
              Timed placement mock sessions &mdash; Sets of 10 questions with progress tracking and mathematical solutions
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
            {(['Quant', 'Logical', 'Verbal'] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedCat(c);
                  setCurrentSetNum(1);
                  setActiveQuiz(false);
                  setQuizFinished(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCat === c ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Not started view */}
        {!activeQuiz && !quizFinished && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900">
                  {selectedCat} Aptitude Practice &mdash; Set {currentSetNum} (10 Questions)
                </CardTitle>
                <Badge variant="indigo">10 Questions / Session</Badge>
              </div>
              <CardDescription className="text-xs">
                Comprehensive screening tests modeled after top tier campus recruitment technical rounds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <p className="font-bold text-slate-800">Session Structure:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>10 Questions per set:</strong> Hand-curated numerical, logic, or verbal evaluation items.</li>
                  <li><strong>Step-by-Step Derivations:</strong> Mathematical proof or grammatical rule displayed immediately upon answer submission.</li>
                  <li><strong>Scoring &amp; Analytics:</strong> Accuracy breakdown and progression to next 10-question set.</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="primary" onClick={handleStartSet} className="gap-2 text-xs">
                  <Play className="w-4 h-4" />
                  <span>Start Set {currentSetNum} (10 Questions)</span>
                </Button>
                {catSets[2] && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentSetNum(currentSetNum === 1 ? 2 : 1);
                    }}
                    className="text-xs"
                  >
                    Switch to Set {currentSetNum === 1 ? '2' : '1'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Quiz view */}
        {activeQuiz && !quizFinished && (
          <Card className="border-indigo-100">
            <CardHeader className="bg-slate-50/70 pb-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                    {selectedCat} &bull; Set {currentSetNum}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    Question {currentQIndex + 1} of {currentQuestions.length}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Progress: {Object.keys(userAnswers).length}/{currentQuestions.length} Answered
                  </span>
                  <div className="w-28 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${(Object.keys(userAnswers).length / currentQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-5 text-xs">
              <h3 className="text-sm font-bold text-slate-900 leading-relaxed">
                {currentQ.q}
              </h3>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOpt === i;
                  const isCorrect = currentQ.correct === i;
                  let styleClass = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      styleClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      styleClass = 'border-rose-400 bg-rose-50 text-rose-900';
                    }
                  } else if (isSelected) {
                    styleClass = 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-semibold';
                  }

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${styleClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[11px] text-slate-700 shadow-2xs">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step by step explanation when answer is submitted */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    <span>Derivation &amp; Solution Analysis:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevQuestion}
                  disabled={currentQIndex === 0}
                  className="text-xs"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {!isAnswerSubmitted ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSubmitAnswer}
                      disabled={selectedOpt === null}
                      className="text-xs bg-indigo-600 text-white"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleNextQuestion}
                      className="text-xs bg-indigo-600 text-white gap-1"
                    >
                      <span>{currentQIndex === currentQuestions.length - 1 ? 'Finish Set' : 'Next Question'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results view upon completing 10 questions */}
        {quizFinished && (
          <Card className="border-emerald-200">
            <CardHeader className="bg-emerald-50/60 pb-4 text-center">
              <Award className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg font-bold text-slate-900">
                Set {currentSetNum} Completed &mdash; {selectedCat} Track
              </CardTitle>
              <CardDescription className="text-xs">
                Performance evaluation across 10 assessment questions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center space-y-6 text-xs">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 text-[11px]">Score</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-0.5">{score} / 10</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 text-[11px]">Accuracy</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-0.5">{score * 10}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 text-[11px]">Status</p>
                  <p className="text-base font-bold text-slate-800 mt-1">
                    {score >= 7 ? 'Cleared' : 'Needs Practice'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={handleStartSet} className="text-xs gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Set {currentSetNum}</span>
                </Button>
                {catSets[currentSetNum === 1 ? 2 : 1] && (
                  <Button variant="primary" size="sm" onClick={handleNextSet} className="text-xs gap-1.5 bg-indigo-600 text-white">
                    <span>Proceed to Set {currentSetNum === 1 ? '2' : '1'} (Next 10 Qs)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
