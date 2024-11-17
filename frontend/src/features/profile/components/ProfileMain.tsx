import { useState, useEffect } from "react";
import { useInitializeProfile } from "../hooks/useInitializeProfile";
import { useInitializeAurora } from "../hooks/useInitializeAurora";
import { useAuroraLogout } from "../hooks/useAuroraLogout";
import { ProfileInformation, ConnectedAccounts } from "../types/ProfileTypes";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

export const ProfileMain = () => {
    const { initProfile, isLoading, error } = useInitializeProfile();
    const { initAurora } = useInitializeAurora();
    const { auroraLogout } = useAuroraLogout();
    const [profileInformation, setProfileInformation] = useState<ProfileInformation | null>(null);
    const [auroraAccounts, setAuroraAccounts] = useState<ConnectedAccounts | null>(null);
    const { user } = useAuth();
    useEffect(() => {
        const loadProfile = async () =>{
            const profile = await initProfile();
            if(profile) {
                setProfileInformation(profile);
            }
        }
        const loadAuroraAccounts = async () => {
            const accounts = await initAurora();

            if(accounts){
                setAuroraAccounts(accounts);
            }
        }
        loadAuroraAccounts();
        loadProfile();
    }, []);

    const handleClick = async (e: any) => {
        const boardType = e.currentTarget.dataset.board;
        const logout = await auroraLogout(boardType);

        if(logout) {
            // logout should return the updated accounts
            setAuroraAccounts(logout);
        }
    }


    if(isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="w-1/4 bg-light-gray rounded flex flex-col m-auto">
                {profileInformation ? (
                    <div className="p-4">
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
                        </div>
                    </div>
                ) : <div>Loading...</div>
                }
                <div className="py-8 w- bg-tan rounded-r-lg px-4 mb-4 mr-8 font-new-science">
                    <h2 className="font-bold">Connected Accounts</h2>
                    <div className="flex flex-col mt-2">
                        {auroraAccounts != null && auroraAccounts.tensionBoard != "" ? (
                                <div className="flex flex-col gap-1">
                                    <h3>Tension Board</h3>
                                    <div className="flex gap-4 items-center font-new-science">
                                        <p className="w-1/5 bg-white flex justify-center py-2 rounded ">{auroraAccounts.tensionBoard}</p>
                                        <button onClick={handleClick} data-board="tensionBoard" className="w-2/5 bg-white flex justify-center py-2 rounded font-bold hover:text-white hover:bg-charcoal hover:cursor-pointer">Disconnect</button>
                                        
                                    </div>
                                </div>
                            )
                            : (<Link to="/tension-login">Tension Board Sign In</Link>)
                        }
                        
                    </div>
                    
                </div>
                
                
            </div>
            {error ? <div>{error}</div> : null}
        </div>
    );
};