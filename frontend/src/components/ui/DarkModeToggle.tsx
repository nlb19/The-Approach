import React from 'react'
import { useState, useEffect } from 'react'

const DarkModeToggle = () => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },[darkMode]);
    return (
        <div className="rounded-full bg-white dark:bg-charcoal w-14 h-8 flex items-center justify-center" onClick={() => {setDarkMode(!darkMode)}}>
            <div className="darkModeToggle h-6 relative w-12 flex items-center justify-start m-auto">
                <svg className="fill-dark-green dark:fill-light-blue h-full absolute dark:translate-x-full transition-all duration-500 ease-in-out" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" />
                </svg>
            </div>
        </div>
    )
}

export default DarkModeToggle