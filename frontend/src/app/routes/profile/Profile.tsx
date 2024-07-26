import { MainPage } from '../../../components/layouts/MainPage';
import { ProfileMain} from '../../../features/profile/components/ProfileMain';
 
export const ProfileInit = () => {
  return (
    <MainPage title="Profile Info">
        <ProfileMain />
    </MainPage>
  );
};

export default ProfileInit;