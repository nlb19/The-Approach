import React from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { MainError } from '../components/errors/MainError';

type ProviderProps ={
    children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  return (
    
      <ErrorBoundary FallbackComponent={MainError}>
          <div className={"min-h-screen text-charcoal dark:text-white overflow-hidden"}>
            { children }
          </div>
          
      </ErrorBoundary>
    
  )
}
