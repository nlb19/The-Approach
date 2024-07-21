import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Provider } from './Provider'

import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";


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
      const  { Register }  = await import('./routes/auth/Register');
      return { Component: Register };
    },
  },
  {
    path: '/auth/login',
    lazy: async () => {
      const  { Login }  = await import('./routes/auth/Login');
      return { Component: Login };
    },
  },{
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('./routes/NotFound');
      return { Component: NotFound };
    },
  },
]);


function App() {
  const { user, login, logout, setUser } = useAuth();
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </AuthContext.Provider>
      
    
  )
};

export default App
