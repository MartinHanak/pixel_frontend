import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedStoreHooks';
import { RootState } from '../store/store';

export default function Navbar() {

    const username = useAppSelector((state: RootState) => state.login.username);

    return (
        <div className="bg-red-500 h-8">
            <div className=' max-w-screen-lg mx-auto w-full flex justify-between items-center h-full px-16'>
                <nav className=''>
                    <Link to="/">Home</Link>

                </nav>

                <div>
                    {username !== '' ?
                        <div className='block'>Logged in as <span className='font-bold'>{username}</span></div>
                        : <Link to="login">Login</Link>}
                </div>

            </div>
        </div>
    )

}