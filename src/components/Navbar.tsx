import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/typedStoreHooks';
import { RootState } from '../store/store';
import { useState } from 'react';
import { logout } from '../reducers/loginSlice';

interface Navbar {
    showLogin: () => void
}

export default function Navbar({ showLogin }: Navbar) {

    const username = useAppSelector((state: RootState) => state.login.username);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [displayLogout, setDisplayLogout] = useState(false);

    const handleLogout = () => {
        setDisplayLogout(false)
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="bg-black text-white h-8">
            <div className=' max-w-screen-lg mx-auto w-full flex justify-between items-center h-full px-16'>
                <nav className=''>
                    <Link to="/">Home</Link>

                </nav>

                <div>
                    {username !== '' ?
                        <div className='block relative select-none'>Logged in as&nbsp;
                            <span onClick={() => setDisplayLogout((prev) => !prev)}
                                className='font-bold cursor-pointer underline'>
                                {username}
                            </span>
                            <div
                                onClick={displayLogout ? handleLogout : undefined}
                                className={`bg-white rounded-lg text-black underline px-4 py-2 absolute bottom-[-3.5rem] right-0 cursor-pointer z-[99999] select-none
                            after:content-[''] after:block after:absolute after:right-4 after:-top-4 after:w-4 after:h-4 after:border-solid after:border-b-[1rem] after:border-x-[1rem] after:border-x-transparent after:border-y-white
                            ${displayLogout ? null : 'hidden opacity-0 cursor-events-none'}`}>
                                Logout
                            </div>
                        </div>
                        : <span onClick={showLogin} className='cursor-pointer'>Login</span>}
                </div>

            </div>
        </div>
    )

}