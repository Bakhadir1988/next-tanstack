'use client';

import { PropsWithChildren, useEffect } from 'react';

import { getSessionId } from '@/shared/api/session.api';

export const SessionProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    getSessionId();
  }, []);

  return <>{children}</>;
};
