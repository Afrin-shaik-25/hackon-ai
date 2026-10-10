import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-md">
        <GraduationCap className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 &mdash; Page Not Found</h1>
      <p className="text-slate-500 text-sm max-w-md mt-2 mb-6">
        The requested screen or portal resource could not be found. Please return to the main dashboard.
      </p>
      <Link href="/">
        <Button variant="primary" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Button>
      </Link>
    </div>
  );
}
