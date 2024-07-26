import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


export const MobileDrawer = () => {
    const handleClick = () => {
        const drawer = document.querySelector('.mobile-drawer__content');
        const toggle = document.querySelector('.mobile-drawer__toggle');
        toggle?.classList.toggle('active');
        drawer?.classList.toggle('-translate-x-full');
    }
    const { user } = useAuth();
    return (
    
        <div className="mobile-drawer__container md:hidden " onClick={ handleClick }>
            <div className="mobile-drawer__toggle">
                <svg height="32px" id="Layer_1" className="fill-white dark:fill-charcoal" viewBox="0 0 32 32" width="32px" >
                    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
                </svg>
            </div>
            <div className="mobile-drawer__content overflow-hidden min-w-64 -translate-x-full transition-all ease-in-out duration-500 absolute h-[calc(100vh-4rem)] top-16 w-1/2 left-0 p-6 bg-dark-blue" >
                <div className="mobile-drawer__content__links flex flex-col gap-4">
                    {user?
                        <>
                            <NavLink to="/profile" className="nav__button hover:text-tan dark:hover:text-purple  text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">
                                <svg className="h-10 fill-white dark:fill-charcoal hover:fill-tan dark:hover:fill-purple" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.9995 1.59997C28.1594 1.59997 31.2234 2.21796 34.1073 3.43793C36.8933 4.61591 39.3962 6.30387 41.5452 8.45283C43.6941 10.6018 45.3821 13.1047 46.5601 15.8907C47.78 18.7746 48.398 21.8386 48.398 24.9985C48.398 28.1584 47.78 31.2224 46.5601 34.1063C45.3821 36.8923 43.6941 39.3952 41.5452 41.5442C39.3962 43.6931 36.8933 45.3811 34.1073 46.5591C31.2234 47.779 28.1594 48.397 24.9995 48.397C21.8396 48.397 18.7756 47.779 15.8917 46.5591C13.1057 45.3811 10.6028 43.6931 8.45383 41.5442C6.30387 39.3942 4.61691 36.8923 3.43893 34.1063C2.21896 31.2224 1.60097 28.1584 1.60097 24.9985C1.60097 21.8386 2.21896 18.7746 3.43893 15.8907C4.61691 13.1047 6.30487 10.6018 8.45383 8.45283C10.6038 6.30287 13.1057 4.61591 15.8917 3.43793C18.7756 2.21796 21.8396 1.59997 24.9995 1.59997ZM24.9995 0C11.1928 0 0 11.1928 0 24.9995C0 38.8062 11.1928 49.999 24.9995 49.999C38.8062 49.999 49.999 38.8062 49.999 24.9995C49.999 11.1928 38.8062 0 24.9995 0Z"/>
                                    <path d="M24.9465 8.59383C28.2824 8.59383 30.9954 11.3078 30.9954 14.6427C30.9954 17.9776 28.2814 20.6916 24.9465 20.6916C21.6116 20.6916 18.8976 17.9776 18.8976 14.6427C18.8976 11.3078 21.6116 8.59383 24.9465 8.59383ZM24.9465 6.99387C20.7216 6.99387 17.2976 10.4188 17.2976 14.6427C17.2976 18.8666 20.7226 22.2916 24.9465 22.2916C29.1704 22.2916 32.5953 18.8666 32.5953 14.6427C32.5953 10.4188 29.1704 6.99387 24.9465 6.99387Z"/>
                                    <path d="M24.9995 1.59997C28.1594 1.59997 31.2234 2.21796 34.1073 3.43793C36.8933 4.61591 39.3962 6.30387 41.5452 8.45283C43.6941 10.6018 45.3821 13.1047 46.5601 15.8907C47.78 18.7746 48.398 21.8386 48.398 24.9985C48.398 28.6534 47.579 32.1534 45.9651 35.4003C44.8891 37.5653 43.4631 39.5692 41.7702 41.3122C40.3662 33.3083 33.3653 27.2075 24.9665 27.2075C16.5677 27.2075 9.59981 33.2793 8.17284 41.2542C6.49487 39.5152 5.0819 37.5182 4.01592 35.3643C2.41295 32.1264 1.59997 28.6394 1.59997 24.9975C1.59997 21.8376 2.21796 18.7736 3.43793 15.8897C4.61591 13.1037 6.30387 10.6008 8.45283 8.45183C10.6028 6.30187 13.1047 4.61491 15.8907 3.43693C18.7746 2.21696 21.8386 1.59897 24.9985 1.59897M24.9995 0C11.1928 0 0 11.1928 0 24.9995C0 32.9543 3.71593 40.0412 9.50681 44.6201V44.2701C9.50681 35.7313 16.4287 28.8094 24.9675 28.8094C33.5063 28.8094 40.4282 35.7313 40.4282 44.2701V44.6731C46.2561 40.0962 50 32.9853 50 25.0005C49.999 11.1928 38.8062 0 24.9995 0Z"/>
                                </svg>
                            </NavLink>
                            <button onClick={handleClick} className="nav__button hover:text-tan dark:hover:text-purple hover:border-none after:hover:border-none  text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">Logout</button>
                        </>
                        :
                        <>
                            <NavLink to="/auth/register" className="nav__button hover:text-tan dark:hover:text-purple  text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">Register</NavLink>
                            <NavLink to="/auth/login" className="nav__button hover:text-tan dark:hover:text-purple  text-white dark:text-charcoal font-new-science font-bold text-lg md:text-xl">Login</NavLink>
                        </>
                    }
                </div>
            </div>
        </div>
    
    );
};