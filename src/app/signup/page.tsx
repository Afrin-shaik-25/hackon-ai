'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PortalAuthView, PortalKey } from '@/components/auth/portal-auth-view';

function SignupContent() {
  const searchParams = useSearchParams();
  const portalParam = searchParams.get('portal')?.toLowerCase();

  let initialPortal: PortalKey = 'student';
  if (portalParam === 'faculty') initialPortal = 'faculty';
  else if (portalParam === 'graduate') initialPortal = 'graduate';
  else if (portalParam === 'graduated-person' || portalParam === 'alumni' || portalParam === 'graduated') initialPortal = 'graduated-person';
  else if (portalParam === 'company' || portalParam === 'recruiter') initialPortal = 'company';
  else if (portalParam === 'admin') initialPortal = 'admin';

  return (
    <PortalAuthView
      initialPortal={initialPortal}
      initialMode="signup"
      allowPortalSwitch={true}
    />
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
