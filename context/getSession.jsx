"use client";
import { SessionProvider } from 'next-auth/react';


function SessionContext({ children }) {
  return <SessionProvider >{children}</SessionProvider>;
}

export default SessionContext;
