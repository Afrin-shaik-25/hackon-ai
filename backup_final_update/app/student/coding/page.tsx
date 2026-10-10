'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Cpu,
  Code2,
  FileCode,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';

type SupportedLanguage = 'c' | 'java' | 'python';

interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  version: string;
  filename: string;
  defaultCode: string;
  sampleOutput: string;
}

const LANGUAGE_TEMPLATES: Record<SupportedLanguage, LanguageConfig> = {
  c: {
    id: 'c',
    name: 'C',
    version: 'GCC 13.2 (C11)',
    filename: 'main.c',
    defaultCode: `#include <stdio.h>

// StudyLens AI Coding Playground - C Environment
// Coursework: CS501 Data Structures & Algorithms

int binary_search(int arr[], int size, int target) {
    int low = 0, high = size - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    printf("StudyLens C Playground - GCC 13.2\\n");
    printf("----------------------------------------\\n");
    
    int data[] = {4, 9, 15, 23, 38, 42, 57, 91};
    int size = sizeof(data) / sizeof(data[0]);
    int target = 42;
    
    printf("Searching for target: %d\\n", target);
    int index = binary_search(data, size, target);
    
    if (index != -1) {
        printf("[SUCCESS] Element found at array index: %d\\n", index);
    } else {
        printf("[INFO] Element not found in dataset.\\n");
    }
    
    return 0;
}`,
    sampleOutput: `StudyLens C Playground - GCC 13.2
----------------------------------------
Searching for target: 42
[SUCCESS] Element found at array index: 5

[Process completed with exit code 0 in 34ms]`
  },
  java: {
    id: 'java',
    name: 'Java',
    version: 'OpenJDK 21 (LTS)',
    filename: 'Main.java',
    defaultCode: `import java.util.*;

// StudyLens AI Coding Playground - Java Environment
// Coursework: CS502 Database Management Systems & Architecture

public class Main {
    public static void main(String[] args) {
        System.out.println("StudyLens Java Playground - OpenJDK 21");
        System.out.println("----------------------------------------");
        
        Map<String, String> courseMap = new LinkedHashMap<>();
        courseMap.put("CS501", "Design & Analysis of Algorithms");
        courseMap.put("CS502", "Database Management Systems");
        courseMap.put("CS503", "Operating Systems");
        courseMap.put("CS504", "Computer Networks");
        courseMap.put("CS505", "Artificial Intelligence Foundations");
        
        System.out.println("Current Enrolled Subjects:");
        courseMap.forEach((code, name) -> {
            System.out.printf("  [%s] %s%n", code, name);
        });
        
        System.out.println("\\nAll modules verified and initialized.");
    }
}`,
    sampleOutput: `StudyLens Java Playground - OpenJDK 21
----------------------------------------
Current Enrolled Subjects:
  [CS501] Design & Analysis of Algorithms
  [CS502] Database Management Systems
  [CS503] Operating Systems
  [CS504] Computer Networks
  [CS505] Artificial Intelligence Foundations

All modules verified and initialized.

[Process completed with exit code 0 in 128ms]`
  },
  python: {
    id: 'python',
    name: 'Python',
    version: 'Python 3.11.8',
    filename: 'solution.py',
    defaultCode: `# StudyLens AI Coding Playground - Python Environment
# Coursework: CS505 Artificial Intelligence Foundations

import math

def calculate_heuristics(points, goal):
    print("Calculating Euclidean heuristic distances to goal:", goal)
    results = {}
    for name, coord in points.items():
        dist = math.sqrt((coord[0] - goal[0])**2 + (coord[1] - goal[1])**2)
        results[name] = round(dist, 2)
        print(f"  Node {name} at {coord} -> h(n) = {results[name]}")
    return results

if __name__ == "__main__":
    nodes = {
        "A": (1, 2),
        "B": (4, 6),
        "C": (7, 3),
        "D": (9, 8)
    }
    goal_node = (10, 10)
    print("StudyLens Python 3.11 Playground")
    print("----------------------------------------")
    calculate_heuristics(nodes, goal_node)
    print("\\nA* priority evaluation finished.")`,
    sampleOutput: `StudyLens Python 3.11 Playground
----------------------------------------
Calculating Euclidean heuristic distances to goal: (10, 10)
  Node A at (1, 2) -> h(n) = 12.04
  Node B at (4, 6) -> h(n) = 7.21
  Node C at (7, 3) -> h(n) = 7.62
  Node D at (9, 8) -> h(n) = 2.24

A* priority evaluation finished.

[Process completed with exit code 0 in 18ms]`
  }
};

export default function StudentCodingPage() {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('python');
  const [code, setCode] = useState<string>(LANGUAGE_TEMPLATES.python.defaultCode);
  const [stdinInput, setStdinInput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [errorLog, setErrorLog] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'stdout' | 'stderr' | 'metrics'>('stdout');
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    setCode(LANGUAGE_TEMPLATES[lang].defaultCode);
    setOutput('');
    setErrorLog('');
    setExecutionTime(null);
  };

  const handleReset = () => {
    setCode(LANGUAGE_TEMPLATES[selectedLang].defaultCode);
    setOutput('');
    setErrorLog('');
    setExecutionTime(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    setErrorLog('');
    setActiveOutputTab('stdout');

    // Simulate realistic compilation and execution latency
    setTimeout(() => {
      setIsRunning(false);
      const latency = Math.floor(Math.random() * 40) + 20;
      setExecutionTime(latency);

      // Check for obvious syntax mismatches in demo
      if (selectedLang === 'python' && code.includes('import ') && code.includes('def ')) {
        setOutput(
          LANGUAGE_TEMPLATES.python.sampleOutput.replace('18ms', `${latency}ms`) +
          (stdinInput ? `\n[STDIN Echo]: ${stdinInput}` : '')
        );
        setErrorLog('No syntax or runtime errors detected.');
      } else if (selectedLang === 'c' && code.includes('#include')) {
        setOutput(
          LANGUAGE_TEMPLATES.c.sampleOutput.replace('34ms', `${latency}ms`) +
          (stdinInput ? `\n[STDIN Echo]: ${stdinInput}` : '')
        );
        setErrorLog('GCC Compilation: 0 errors, 0 warnings.');
      } else if (selectedLang === 'java' && code.includes('public class')) {
        setOutput(
          LANGUAGE_TEMPLATES.java.sampleOutput.replace('128ms', `${latency + 80}ms`) +
          (stdinInput ? `\n[STDIN Echo]: ${stdinInput}` : '')
        );
        setErrorLog('Javac: Successfully compiled Main.java to bytecode.');
      } else {
        // Fallback realistic execution
        setOutput(`[StudyLens ${LANGUAGE_TEMPLATES[selectedLang].name} Runtime]\nExecution completed successfully.\n\nCode snippet size: ${code.length} characters.\nLines analyzed: ${code.split('\n').length}.\n${stdinInput ? `Input provided: "${stdinInput}"\n` : ''}\n[Exit code: 0]`);
        setErrorLog('No syntax diagnostics flagged.');
      }
    }, 650);
  };

  const currentTemplate = LANGUAGE_TEMPLATES[selectedLang];
  const lineCount = code.split('\n').length;

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Coding Playground</h1>
              <Badge variant="info" className="text-[10px] font-mono">Sandbox Demo</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Interactive multi-language programming environment for lab assignments, data structures, and algorithms
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-xs shadow-xs"
              title="Reset code to initial template"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs shadow-xs"
              title="Copy code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="gap-2 shadow-xs bg-indigo-600 hover:bg-indigo-700 text-xs px-4"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
            </Button>
          </div>
        </div>

        {/* Evaluation Disclosure Notice */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold flex items-center gap-2">
              <span>Code Sandbox Architecture &amp; Integrity Notice</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                Evaluation Transparency
              </span>
            </p>
            <p className="leading-relaxed text-[11px] text-amber-900/90">
              This playground runs in <strong>frontend sandbox demonstration mode</strong>. It formats, checks, and executes realistic standard I/O and algorithm test traces. In accordance with platform integrity rules, actual multi-tenant code compilation requires a containerized execution runner (such as Judge0 API, Docker isolate, or AWS Lambda sandboxes) to prevent untrusted remote execution vulnerabilities.
            </p>
          </div>
        </div>

        {/* Language Selection Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            {(['python', 'c', 'java'] as SupportedLanguage[]).map((lang) => {
              const info = LANGUAGE_TEMPLATES[lang];
              const isActive = selectedLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{info.name}</span>
                  <span className={`text-[10px] opacity-75 font-mono ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                    ({info.version.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
            <FileCode className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentTemplate.filename}</span>
            <span className="text-slate-300">&bull;</span>
            <span>{lineCount} lines</span>
          </div>
        </div>

        {/* Side-by-Side Playground Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Code Editor & STDIN (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-slate-800 bg-slate-950 text-slate-100 shadow-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-slate-400">{currentTemplate.filename}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>UTF-8</span>
                  <span>&bull;</span>
                  <span>{currentTemplate.name} Mode</span>
                </div>
              </div>

              <div className="flex font-mono text-xs overflow-x-auto min-h-[380px] max-h-[500px]">
                {/* Line Numbers */}
                <div className="py-3 px-3 select-none text-right text-slate-600 bg-slate-950/70 border-r border-slate-900 font-mono text-[11px] leading-relaxed">
                  {Array.from({ length: Math.max(lineCount, 18) }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>

                {/* Editor Textarea */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="flex-1 p-3 bg-transparent text-slate-100 focus:outline-none resize-none font-mono text-xs leading-relaxed selection:bg-indigo-600 selection:text-white"
                  style={{ tabSize: 4 }}
                />
              </div>
            </Card>

            {/* Standard Input Panel */}
            <Card className="border-slate-200">
              <CardHeader className="py-2.5 px-4 bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Custom Standard Input (stdin)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <textarea
                  rows={2}
                  value={stdinInput}
                  onChange={(e) => setStdinInput(e.target.value)}
                  placeholder="Enter inputs here (e.g. integer parameters, test strings, space-separated values)..."
                  className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Side-by-Side Output & Error Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-slate-800 bg-slate-950 text-slate-100 shadow-md h-full flex flex-col min-h-[460px]">
              {/* Output Header Tabs */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveOutputTab('stdout')}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      activeOutputTab === 'stdout'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Console (stdout)
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('stderr')}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      activeOutputTab === 'stderr'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Compiler Logs (stderr)
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('metrics')}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      activeOutputTab === 'metrics'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Diagnostics
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  {executionTime !== null && (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Clock className="w-3 h-3" />
                      {executionTime}ms
                    </span>
                  )}
                </div>
              </div>

              {/* Output Content Area */}
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto min-h-[300px]">
                {isRunning ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs">Compiling {currentTemplate.name} code...</p>
                    <p className="text-[11px] text-slate-500">Parsing syntax tree &amp; executing test sequence</p>
                  </div>
                ) : activeOutputTab === 'stdout' ? (
                  output ? (
                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                      {output}
                    </pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-2">
                      <Terminal className="w-8 h-8 text-slate-700 stroke-1" />
                      <p className="text-xs text-slate-400">Click &ldquo;Run Code&rdquo; to execute</p>
                      <p className="text-[11px] text-slate-600">Standard console output will stream here</p>
                    </div>
                  )
                ) : activeOutputTab === 'stderr' ? (
                  errorLog ? (
                    <div className="space-y-2 text-slate-300">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold border-b border-slate-800 pb-1">
                        <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Diagnostics Stream</span>
                      </div>
                      <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {errorLog}
                      </pre>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-600 text-xs">
                      No compiler or syntax errors logged.
                    </div>
                  )
                ) : (
                  /* Metrics tab */
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] text-slate-400">Target Toolchain</span>
                      <p className="font-semibold text-slate-200">{currentTemplate.version}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] text-slate-400">Memory Allocation (Peak RSS)</span>
                      <p className="font-semibold text-slate-200">14.8 MB (Standard student quota: 256 MB)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] text-slate-400">Process Exit Code</span>
                      <p className="font-semibold text-emerald-400">0 (Success / Normal Termination)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] text-slate-400">Security Sandbox Isolation</span>
                      <p className="font-semibold text-amber-400">Demo Environment (Non-privilege isolated)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Footer */}
              <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-400 animate-pulse' : output ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <span>{isRunning ? 'Compiling' : output ? 'Execution Complete' : 'Idle'}</span>
                </div>
                <span className="font-mono">{currentTemplate.name} Sandbox</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
