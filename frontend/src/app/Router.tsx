import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ProfileInit from './routes/profile/ProfileInit';
import Profile from './routes/profile/Profile';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import TensionLogin from './routes/aurora/TensionLogin';

import { ProviderProps } from '../types/ProviderProps';
import { useAuth } from "../hooks/useAuth";

function NewUserRoute({ children }: ProviderProps ) {
    const { user, loading } = useAuth();
    if(loading) {
        return <div>Loading...</div>
    }
    return user ? <Navigate to='/'/> : children;
};
function PrivateRoute({ children }: ProviderProps ) {
  const { user, loading } = useAuth();
  if(loading) {
    return <div>Loading...</div>
  }
  return user ? children : <Navigate to='/auth/login'/>;
};
const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Landing } = await import('./routes/Landing');
      return { Component: Landing };
    },
  },
  {
    path: '/auth/register',
    element: <NewUserRoute><Register /></NewUserRoute>
  },
  {
    path: '/auth/login',
    element: <NewUserRoute><Login /></NewUserRoute>
  },
  {
    path: '/profile-info',
    element: <PrivateRoute><ProfileInit /></PrivateRoute>,
  },
  {
    path: '/profile',
    element: <PrivateRoute><Profile /></PrivateRoute>,
  },
  {
    path: '/tension-login',
    element: <PrivateRoute><TensionLogin /></PrivateRoute>,
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('./routes/NotFound');
      return { Component: NotFound };
    },
  },
]);

export const Router = () => {
    return <RouterProvider router={router} />
}