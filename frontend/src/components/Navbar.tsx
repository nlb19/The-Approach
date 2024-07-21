import React from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import DarkModeToggle  from './ui/DarkModeToggle'

const Navbar = () => {

    const { user, logout } = useAuth();
    return (
        <nav className="the-approach__nav h-16 md:h-24 w-screen bg-dark-green dark:bg-light-blue fixed top-0 px-4 md:px-8 flex gap-4 z-10">
            <div className="nav__left w-1/4 md:w-1/3 flex gap-8 items-center">
                {user && (
                    <div className="nav__profile-container flex justify-center items-center gap-4">
                        <p className="text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">{user.email}</p>
                        <button onClick={() => logout()} className="nav__button hover:text-tan dark:hover:text-purple text-center text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="nav__profile-container flex justify-center itmes-center text gap-12">
                        <NavLink to="/auth/register" className="nav__button hover:text-tan dark:hover:text-purple text-center text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">Register</NavLink>
                        <NavLink to="/auth/login" className="nav__button hover:text-tan dark:hover:text-purple text-center text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">Login</NavLink>
                    </div>  
                )}
                
            </div>
            <div className="nav__center w-1/2 md:w-1/3">
                <div className="nav__logo-container w-full h-full p-2 flex items-center justify-center">
                    <NavLink to="/" className="hover:text-tan dark:hover:text-purple text-white dark:text-charcoal font-roca font-black tracking-tighter text-2xl md:text-4xl text-center">The Approach</NavLink>
                </div>
            </div>
            <div className="nav__right w-1/4 md:w-1/3 flex justify-end gap-8 items-center">
                
                <div className="nav__dark-mode-toggle-container h-full p-2 flex items-center justify-end">
                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar