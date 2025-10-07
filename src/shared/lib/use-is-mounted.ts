// src/shared/lib/use-is-mounted.ts
'use client';

import { useState, useEffect } from 'react';

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
