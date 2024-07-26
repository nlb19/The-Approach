import { MainPage } from '../../../components/layouts/MainPage';
import { ProfileInitForm } from '../../../features/profile/components/ProfileInitForm';

export const ProfileInit = () => {
  return (
    <MainPage title="Profile Info">
        <ProfileInitForm />
    </MainPage>
  );
};

export default ProfileInit;