import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Provider } from './Provider'
import { ProviderProps } from '../types/ProviderProps';
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import ProfileInit from './routes/ProfileInit';

function PrivateRoute({ children }: ProviderProps ) {
  const{ user } = useAuth();
  return user ? children : <Navigate to='/auth/login'/>;
};

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Landing } = await import('./routes/Landing');
      return { Component: Landing };
    },
  },{
    path: '/auth/register',
    lazy: async () => {
      const { Register } = await import('./routes/auth/Register');
      return { Component: Register };
    },
  },
  {
    path: '/auth/login',
    lazy: async () => {
      const  { Login }  = await import('./routes/auth/Login');
      return { Component: Login };
    },
  },
  {
    path: '/profile-info',
    element: <PrivateRoute><ProfileInit /></PrivateRoute>,
  },{
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('./routes/NotFound');
      return { Component: NotFound };
    },
  },
]);


function App() {
  return (
    <AuthProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  )
};

export default App
