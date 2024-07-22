import RegisterForm from '../../../features/auth/components/RegisterForm'
import { MainPage } from '../../../components/layouts/MainPage'


export const Register = () => {
  return (
    <MainPage title="Register">
      <RegisterForm />
    </MainPage>
  )
}