'use client';

import { PropsWithChildren } from 'react';

import SessionContext from './session.context';

type SessionProviderProps = PropsWithChildren<{
  sessionId: string;
}>;

export const SessionProvider = ({
  children,
  sessionId,
}: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={sessionId}>
      {children}
    </SessionContext.Provider>
  );
};
