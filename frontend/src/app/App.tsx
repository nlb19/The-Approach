import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Provider } from './Provider'

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
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  )
};

export default App
