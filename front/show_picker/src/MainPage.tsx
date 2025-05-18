import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from './contexts/current-user-context.ts';

function MainPage() {
    const currentUserContext = useContext(CurrentUserContext);
    const username: string | undefined = currentUserContext?.loggedUser?.username;

    return (
        <>
            <div>{username !== null ? `Welcome ${username}` : `No user logged`}</div>

            <h1>Show Picker</h1>
            <Link to="/register">
                <h2>Register</h2>
            </Link>

            <Link to="/login">
                <h2>Login</h2>
            </Link>
        </>
    );
}

export { MainPage };
