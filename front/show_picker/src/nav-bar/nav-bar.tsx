import { Link } from 'react-router-dom';
import './nav-bar.css';

function NavBar({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <nav className="nav_bar">
            <ul>
                <li>
                    <Link to="">Home</Link>
                </li>
                <li>
                    <Link>Most popular</Link>
                </li>
                <li>
                    <Link>User picks</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="logout">Log out</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="register">Register</Link>
                        </li>
                        <li>
                            <Link to="login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export { NavBar };
