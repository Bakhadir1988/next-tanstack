'use client';

import { createContext, useContext } from 'react';

const SessionContext = createContext<string | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default SessionContext;
