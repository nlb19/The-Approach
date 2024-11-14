import React from 'react'
import TensionLoginForm from '../../../features/boardAuth/components/TensionLoginForm'
import { MainPage } from '../../../components/layouts/MainPage'


const TensionLogin = () => {
  return (
    <MainPage title="Login">
      <TensionLoginForm />
    </MainPage>
  )
}

export default TensionLogin