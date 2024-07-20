import React from 'react'
import Header from '../components/Header'
import { ErrorBoundary } from 'react-error-boundary';
import { MainError } from '../components/errors/MainError';
import { Route, Routes } from 'react-router-dom';

type ProviderProps ={
    children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  return (
    
      <ErrorBoundary FallbackComponent={MainError}>
          <div className={"min-h-screen w-screen text-charcoal dark:text-white"}>
            { children }
          </div>
          
      </ErrorBoundary>
    
  )
}
