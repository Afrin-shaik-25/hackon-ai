import React from 'react';
import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="neutral">Platform Agreement</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Terms governing the usage of StudyLens AI during the HacXLerate 2026 hackathon evaluation.
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">1. Acceptance of Evaluation Terms</h2>
              <p>
                By accessing StudyLens AI, users acknowledge that this prototype is built for the HacXLerate 2026 Hackathon. Unless explicitly connected to an approved institutional endpoint, all student marks, attendance tallies, and job applicant profiles shown are synthetic demonstration records.
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-3">2. Limitations of FocusNest Study Timer</h2>
              <p>
                The FocusNest Study Timer provided within the Student Portal is a productivity aid. As documented throughout the application, standard browser sandboxes do not possess OS-level privileges to terminate external mobile or desktop applications without native platform extensions.
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-3">3. Verification Responsibility</h2>
              <p>
                Institutions and employers are responsible for verifying authoritative academic credentials through official transcripts prior to formal degree conferral or corporate hiring offers.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
