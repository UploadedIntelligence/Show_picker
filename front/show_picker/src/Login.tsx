import React, { useState } from 'react';
import axios from 'axios';
import type { ICurrentUserContext } from './contexts/current-user-context.ts';

interface LoggedUserProps {
    setLoggedUser: React.Dispatch<React.SetStateAction<ICurrentUserContext['loggedUser'] | null>>;
}

function Login({ setLoggedUser }: LoggedUserProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function logAttempt() {
        axios
            .post<{
                email: string;
                username: string;
                id: number;
            }>(
                'http://localhost:9000/login',
                {
                    email,
                    password,
                },
                { withCredentials: true },
            )
            .then((result) => {
                setLoggedUser(result.data);
            });
    }

    return (
        <form className="login" action={logAttempt}>
            <h2>Login</h2>
            <label> Email: </label>
            <input type="text" onChange={(event) => setEmail(event.target.value)} />
            <label> Password: </label>
            <input type="text" onChange={(event) => setPassword(event.target.value)} />
            <button className="submit_log_btn" type="submit">
                Submit
            </button>
        </form>
    );
}

export { Login };
