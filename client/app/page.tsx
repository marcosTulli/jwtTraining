"use client";
import React, { useEffect } from 'react';
import Home from '@/app/components/home/Home';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const params = useSearchParams();
  const authCode = params.getAll('code').length > 0 ? params.getAll('code')[0] : "";
  useEffect(() => {
    if (authCode) {
      window.opener.postMessage(authCode, window.location.origin);
    }
  }, [authCode]);

  return (
    <Home />
  );
}