import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login/Logout</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/game">New Game</Link></li>
                <li><Link to="/games">Games</Link></li>
            </ul>
        </nav>
    )

}