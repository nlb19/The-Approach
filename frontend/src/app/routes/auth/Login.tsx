import React from 'react'
import LoginForm from '../../../features/auth/components/LoginForm'
import { MainPage } from '../../../components/layouts/MainPage'


export const Login = () => {
  return (
    <MainPage title="Login">
      <LoginForm />
    </MainPage>
  )
}