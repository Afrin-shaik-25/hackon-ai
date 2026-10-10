'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { CsvImporter } from '@/components/shared/csv-importer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_IMPORT_HISTORY } from '@/lib/demo-data/faculty';
import { ImportRecord } from '@/types';
import { FileSpreadsheet, CheckCircle2, AlertOctagon, Download, Eye, FileUp } from 'lucide-react';
import { Modal } from '@/components/ui/modal';

export default function FacultyImportsPage() {
  const [history, setHistory] = useState<ImportRecord[]>(DEMO_IMPORT_HISTORY);
  const [selectedRecord, setSelectedRecord] = useState<ImportRecord | null>(null);

  const handleImportComplete = (newRecord: ImportRecord) => {
    setHistory([newRecord, ...history]);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Integration &amp; Ingestion</h1>
          <p className="text-xs text-slate-500 mt-1">
            Reconcile departmental spreadsheets, attendance logs, and LMS engagement into the cohort database (30% Evaluation Weight)
          </p>
        </div>

        {/* 5-Step CSV Ingestion Pipeline */}
        <CsvImporter onImportComplete={handleImportComplete} />

        {/* Import History & Audit Log */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Consolidated Ingestion History</CardTitle>
                <CardDescription>Audit records of previously processed CSV batches</CardDescription>
              </div>
              <Badge variant="outline">Institutional Audit Log</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                    <th className="px-4 py-3">Batch ID</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Filename</th>
                    <th className="px-4 py-3">Ingested At</th>
                    <th className="px-4 py-3">Accepted</th>
                    <th className="px-4 py-3">Rejected</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-600">{record.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800 capitalize">{record.sourceTitle}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 truncate max-w-xs">{record.fileName}</td>
                      <td className="px-4 py-3 text-slate-500">{record.uploadedAt}</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">{record.acceptedRows}</td>
                      <td className="px-4 py-3">
                        {record.rejectedRows > 0 ? (
                          <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            {record.rejectedRows} rows
                          </span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="success">{record.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                          className="h-7 text-xs text-indigo-600"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View Log
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal for Rejected Rows Detail */}
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={`Batch Audit: ${selectedRecord?.id || ''}`}
          description={`Details for file: ${selectedRecord?.fileName || ''}`}
          maxWidth="lg"
        >
          {selectedRecord && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500">Total Rows:</span>
                  <p className="font-bold text-slate-800 text-sm">{selectedRecord.totalRows}</p>
                </div>
                <div>
                  <span className="text-emerald-700">Accepted:</span>
                  <p className="font-bold text-emerald-800 text-sm">{selectedRecord.acceptedRows}</p>
                </div>
                <div>
                  <span className="text-rose-700">Rejected:</span>
                  <p className="font-bold text-rose-800 text-sm">{selectedRecord.rejectedRows}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Rejected Rows Analysis</h4>
                {selectedRecord.rejectedDetails.length > 0 ? (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 text-[11px]">
                          <th className="p-2">Line</th>
                          <th className="p-2">Student ID</th>
                          <th className="p-2">Validation Failure Reason</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedRecord.rejectedDetails.map((rej, i) => (
                          <tr key={i} className="bg-rose-50/40">
                            <td className="p-2 font-mono font-bold text-rose-700">{rej.row}</td>
                            <td className="p-2 font-mono">{rej.studentId}</td>
                            <td className="p-2 text-rose-800">{rej.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-center">
                    All rows conformed cleanly to the schema. Zero rejections recorded.
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedRecord(null)}>
                  Close Audit Record
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardShell>
  );
}
