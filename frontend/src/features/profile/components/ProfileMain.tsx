import { useState, useEffect } from "react";
import { useInitializeProfile } from "../hooks/useInitializeProfile";
import { ProfileInformation } from "../types/ProfileTypes";
import { useAuth } from "../../../hooks/useAuth";

export const ProfileMain = () => {
    const { initProfile, isLoading, error } = useInitializeProfile();
    const [profileInformation, setProfileInformation] = useState<ProfileInformation | null>(null);
    const { user } = useAuth();
    useEffect(() => {
        const loadProfile = async () =>{
            const profile = await initProfile();
            if(profile) {
                setProfileInformation(profile);
            }
        }
        loadProfile();
    }, []);

    useEffect(() => {

    }, [profileInformation]);

    if(isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="w-3/4 bg-light-gray rounded p-4 flex flex-col m-auto">
                {profileInformation ? (
                    <div>
                        <h2>Personal Information</h2>
                        <div>
                            <h1 className="font-josefin text-xl md:text-3xl font-bold tracking-tighter">{user.firstName} {user.lastName}</h1>
                            <p>Email: {profileInformation.user.email}</p>
                            <p>Date of Birth: {profileInformation.user.profileInformation.dob}</p>
                            <p>Location: {profileInformation.user.profileInformation.location}</p>
                            <p>Preferred Discipline: {profileInformation.user.profileInformation.discipline}</p>
                            <p>Hardest Boulder: {profileInformation.user.profileInformation.hardestBoulder}</p>
                            <p>Hardest Route: {profileInformation.user.profileInformation.hardestRoute}</p>
                            <p>Height: {profileInformation.user.profileInformation.height}</p>
                            <p>Weight: {profileInformation.user.profileInformation.weight}</p>
                            <p>Max Hang: {profileInformation.user.profileInformation.maxHang}</p>
                            <p>Max Pull: {profileInformation.user.profileInformation.maxPull}</p>
                            <p>Climbing Since: {profileInformation.user.profileInformation.experience}</p>
                            <p>Favorite Crag/Gym: {profileInformation.user.profileInformation.favLocation}</p>
                            
                            "
                        </div>
                    </div>
                ) : <div>Loading...</div>
                }
            </div>
            {error ? <div>{error}</div> : null}
        </div>
    );
};