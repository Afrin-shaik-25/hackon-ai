'use client';

import React, { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PortalAuthView, PortalKey } from '@/components/auth/portal-auth-view';

function PortalRoleContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const rawRole = (params?.role as string)?.toLowerCase() || 'student';
  const modeParam = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  // Normalize role key
  let portalKey: PortalKey = 'student';
  if (rawRole === 'faculty') portalKey = 'faculty';
  else if (rawRole === 'graduate') portalKey = 'graduate';
  else if (rawRole === 'graduated-person' || rawRole === 'alumni' || rawRole === 'graduated') portalKey = 'graduated-person';
  else if (rawRole === 'company' || rawRole === 'recruiter') portalKey = 'company';
  else if (rawRole === 'admin') portalKey = 'admin';

  return (
    <PortalAuthView
      initialPortal={portalKey}
      initialMode={modeParam}
      allowPortalSwitch={true}
    />
  );
}

export default function PortalRolePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <PortalRoleContent />
    </Suspense>
  );
}
