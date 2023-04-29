import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedStoreHooks';
import { RootState } from '../store/store';

export default function Navbar() {

    const username = useAppSelector((state: RootState) => state.login.username);

    return (
        <nav>
            <Link to="/">Home</Link>
            {username !== '' ? <Link to="game">{username}</Link> : <Link to="login">Login</Link>}
        </nav>
    )

}