'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileUp,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  FileSpreadsheet,
  ArrowRight,
  RotateCcw,
  Download,
  Info
} from 'lucide-react';
import { ImportRecord } from '@/types';

interface CsvImporterProps {
  onImportComplete?: (record: ImportRecord) => void;
}

export function CsvImporter({ onImportComplete }: CsvImporterProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [sourceType, setSourceType] = useState<'academics' | 'attendance' | 'assessments' | 'lms' | 'skills'>('academics');
  const [fileName, setFileName] = useState('CS_Semester5_Midterm_Results_2026.csv');
  const [mapping, setMapping] = useState({
    studentId: 'student_roll_no',
    courseCode: 'sub_code',
    internalMarks: 'int_marks_30',
    externalMarks: 'ext_marks_70',
    totalMarks: 'total_score',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ImportRecord | null>(null);

  // Sample data simulating parsed CSV rows
  const sampleParsedRows = [
    { row: 1, studentId: '2023CS101', name: 'Aarav Sharma', sub: 'CS501', marks: 90, status: 'Valid' },
    { row: 2, studentId: '2023CS109', name: 'Priya Patel', sub: 'CS501', marks: 67, status: 'Valid' },
    { row: 3, studentId: '2023CS115', name: 'Ananya Verma', sub: 'CS501', marks: 55, status: 'Valid' },
    { row: 4, studentId: '2023CS999', name: 'Unenrolled Student', sub: 'CS501', marks: 82, status: 'Rejected: ID Not In Cohort' },
    { row: 5, studentId: '2023CS128', name: 'Devansh Kulkarni', sub: 'CS501', marks: 77, status: 'Valid' },
    { row: 6, studentId: '2023CS107', name: 'Kavita Sen', sub: 'CS501', marks: 'AB', status: 'Rejected: Non-numeric marks value' },
  ];

  const handleStartProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newRecord: ImportRecord = {
        id: `imp-${Date.now().toString().slice(-4)}`,
        source: sourceType,
        sourceTitle:
          sourceType === 'academics' ? 'Semester Mid-Term Examination' :
          sourceType === 'attendance' ? 'Biometric Attendance Logs' :
          sourceType === 'assessments' ? 'Lab Assessment Scores' :
          sourceType === 'lms' ? 'LMS Course Access Logs' : 'Verified Skills Upload',
        fileName,
        uploadedAt: 'Just now',
        totalRows: 148,
        acceptedRows: 146,
        rejectedRows: 2,
        status: 'Completed',
        uploader: 'Dr. K. Raman (Faculty)',
        rejectedDetails: [
          { row: 4, studentId: '2023CS999', reason: 'Student ID not registered in CS Semester 5 cohort' },
          { row: 6, studentId: '2023CS107', reason: "Invalid score literal 'AB'; requires 0-100 integer" },
        ]
      };
      setImportResult(newRecord);
      setStep(5);
      if (onImportComplete) onImportComplete(newRecord);
    }, 800);
  };

  const handleReset = () => {
    setStep(1);
    setImportResult(null);
  };

  return (
    <Card className="border border-slate-200/90 shadow-sm">
      <CardHeader className="bg-slate-50/60 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="w-5 h-5 text-indigo-600" />
              <span>Upload &amp; Validate Student Records</span>
            </CardTitle>
            <CardDescription>
              Upload student files, map fields, check validation errors, and update records
            </CardDescription>
          </div>
          <Badge variant="warning">Demo Upload Mode</Badge>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mt-4 max-w-xl text-xs font-semibold">
          {[
            { num: 1, label: 'Source' },
            { num: 2, label: 'Upload' },
            { num: 3, label: 'Map Columns' },
            { num: 4, label: 'Validate' },
            { num: 5, label: 'Summary' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? 'bg-indigo-600 text-white'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={step >= s.num ? 'text-slate-900' : 'text-slate-400'}>{s.label}</span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* STEP 1: SELECT SOURCE */}
        {step === 1 && (
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-slate-800">Step 1: Select Data Source Category</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'academics', title: 'Academic Examination Records', desc: 'Internal assessments, midterm scores, theory & lab marks' },
                { id: 'attendance', title: 'Biometric Attendance Logs', desc: 'Lecture attendance tallies, dates, present/absent counts' },
                { id: 'assessments', title: 'Assessment & Quiz Scores', desc: 'Platform MCQ scores, coding tests, aptitude results' },
                { id: 'lms', title: 'LMS Engagement Records', desc: 'Moodle/Canvas activity logs, login counts, reading hours' },
                { id: 'skills', title: 'Skills & Project Repositories', desc: 'Verified hackathon submissions, capstone code links' },
              ].map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSourceType(s.id as 'academics' | 'attendance' | 'assessments' | 'lms' | 'skills')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    sourceType === s.id
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{s.title}</span>
                    <input
                      type="radio"
                      name="sourceType"
                      checked={sourceType === s.id}
                      onChange={() => {}}
                      className="text-indigo-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3">
              <Button onClick={() => setStep(2)} variant="primary">
                <span>Continue to Upload</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: UPLOAD CSV */}
        {step === 2 && (
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-slate-800">Step 2: Upload CSV File</h4>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3 bg-slate-50/40">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Pre-loaded evaluation sample ready:</p>
                <p className="text-sm font-bold text-indigo-600 mt-0.5">{fileName}</p>
                <p className="text-[11px] text-slate-500 mt-1">148 rows &bull; UTF-8 encoded &bull; 24.8 KB</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={() => alert("Sample CSV file loaded into preview.")}>
                  Reload Evaluation Template
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button onClick={() => setStep(1)} variant="ghost" size="sm">Back</Button>
              <Button onClick={() => setStep(3)} variant="primary">
                <span>Proceed to Column Mapping</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: MAP COLUMNS */}
        {step === 3 && (
          <div className="space-y-5 text-xs">
            <h4 className="text-sm font-bold text-slate-800">Step 3: Map CSV Headers to Standard Schema</h4>
            <p className="text-slate-500">
              Match the columns detected in your uploaded spreadsheet to our institutional schema fields.
            </p>

            <div className="space-y-3 max-w-lg">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Student Roll / Identifier *</span>
                <select
                  value={mapping.studentId}
                  onChange={(e) => setMapping({ ...mapping, studentId: e.target.value })}
                  className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                >
                  <option value="student_roll_no">student_roll_no (Mapped)</option>
                  <option value="enrollment_id">enrollment_id</option>
                  <option value="student_id">student_id</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Course / Subject Code *</span>
                <select
                  value={mapping.courseCode}
                  onChange={(e) => setMapping({ ...mapping, courseCode: e.target.value })}
                  className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                >
                  <option value="sub_code">sub_code (Mapped)</option>
                  <option value="course_id">course_id</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Total Marks Obtained *</span>
                <select
                  value={mapping.totalMarks}
                  onChange={(e) => setMapping({ ...mapping, totalMarks: e.target.value })}
                  className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                >
                  <option value="total_score">total_score (Mapped)</option>
                  <option value="marks_100">marks_100</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <Button onClick={() => setStep(2)} variant="ghost" size="sm">Back</Button>
              <Button onClick={() => setStep(4)} variant="primary">
                <span>Run Schema Validation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: PREVIEW & REJECTED ROWS VALIDATION */}
        {step === 4 && (
          <div className="space-y-5 text-xs">
            <h4 className="text-sm font-bold text-slate-800">Step 4: Validation Preview &amp; Error Detection</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-slate-500 font-medium">Total Rows In File</p>
                <p className="text-xl font-bold text-slate-900 mt-1">148</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <p className="text-emerald-700 font-medium">Valid Accepted Rows</p>
                <p className="text-xl font-bold text-emerald-800 mt-1">146</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <p className="text-rose-700 font-medium">Rejected / Corrupted</p>
                <p className="text-xl font-bold text-rose-800 mt-1">2</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                Rejected Rows Detected (Excluded from Ingestion):
              </p>
              <ul className="list-disc pl-5 text-[11px] space-y-0.5">
                <li>Row 4: Student ID &lsquo;2023CS999&rsquo; not found in enrolled Semester 5 cohort.</li>
                <li>Row 6: Score value &lsquo;AB&rsquo; is non-numeric; expected valid integer (0-100).</li>
              </ul>
            </div>

            {/* Preview table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
                    <th className="p-2.5">Row</th>
                    <th className="p-2.5">Student Roll</th>
                    <th className="p-2.5">Student Name</th>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Marks</th>
                    <th className="p-2.5">Validation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sampleParsedRows.map((r) => (
                    <tr key={r.row} className={r.status.startsWith('Rejected') ? 'bg-rose-50/50' : 'hover:bg-slate-50'}>
                      <td className="p-2.5 font-mono">{r.row}</td>
                      <td className="p-2.5 font-mono font-medium">{r.studentId}</td>
                      <td className="p-2.5">{r.name}</td>
                      <td className="p-2.5">{r.sub}</td>
                      <td className="p-2.5 font-bold">{r.marks}</td>
                      <td className="p-2.5">
                        {r.status === 'Valid' ? (
                          <Badge variant="success">Valid Row</Badge>
                        ) : (
                          <Badge variant="danger">{r.status}</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3">
              <Button onClick={() => setStep(3)} variant="ghost" size="sm">Back</Button>
              <Button onClick={handleStartProcess} loading={isProcessing} variant="primary">
                Confirm &amp; Ingest 146 Valid Records
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: SUMMARY & COMPLETION */}
        {step === 5 && importResult && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">CSV Import Completed Successfully</h3>
              <p className="text-xs text-slate-500 mt-1">
                Batch ID: <span className="font-mono text-slate-700">{importResult.id}</span> &bull; 146 student records merged into cohort score pipeline
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Source Category:</span>
                <strong className="text-slate-800">{importResult.sourceTitle}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">File Ingested:</span>
                <span className="font-mono text-slate-800">{importResult.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Accepted Records:</span>
                <strong className="text-emerald-700">{importResult.acceptedRows} / {importResult.totalRows}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Excluded (Rejected):</span>
                <strong className="text-rose-700">{importResult.rejectedRows}</strong>
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handleReset} variant="outline" size="sm" className="gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Upload Another Dataset</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
