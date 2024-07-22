import React from 'react'
import LoginForm from '../../../features/auth/components/LoginForm'
import { MainPage } from '../../../components/layouts/MainPage'


const Login = () => {
  return (
    <MainPage title="Login">
      <LoginForm />
    </MainPage>
  )
}

export default Login