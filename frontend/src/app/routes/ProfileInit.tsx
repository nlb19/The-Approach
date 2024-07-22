import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MainPage } from '../../components/layouts/MainPage';
//import { ProfileForm } from '../../features/profile/components/ProfileForm';
import { useNavigate } from 'react-router-dom';

export const ProfileInit = () => {
  const { user } = useAuth();
  //const [profile, setProfile] = useState(user?.profile);

  return (
    <MainPage title="Profile Info">
        {/*<ProfileForm profile={profile} setProfile={setProfile} />*/}
        {user? <div>Customize your profile, { user.firstName}</div> : <div>useNavigate('./auth/login')</div>}
    </MainPage>
  );
};

export default ProfileInit;