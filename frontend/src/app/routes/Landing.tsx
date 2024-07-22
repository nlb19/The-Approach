import { MainPage } from '../../components/layouts/MainPage';
import { useAuth } from '../../hooks/useAuth';

export const Landing = () => {
  const { user } = useAuth();
  return (
    <MainPage title="Landing">
      {user?
        <h1 className="font-roca text-2xl text-dark-green dark:text-light-blue font-black uppercase">Landing -- {user.firstName} {user.lastName}</h1>
        :
        <h1 className="font-roca text-2xl text-dark-green dark:text-light-blue font-black uppercase">Landing</h1>
      } 
    </MainPage>
  )
}
