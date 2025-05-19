import React, { useState } from 'react';
import axios from 'axios';
import type { ICurrentUserContext } from './contexts/current-user-context.ts';
import { Link } from 'react-router-dom';

interface LoggedUserProps {
    setLoggedUser: React.Dispatch<React.SetStateAction<ICurrentUserContext['loggedUser'] | null>>;
}

function Login({ setLoggedUser }: LoggedUserProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrMsg] = useState(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

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
                console.log(result.data, 'result data');
            })
            .catch((err) => {
                setErrMsg(err.response.data);
                setIsVisible(true);
            });
    }

    return (
        <form className="login" action={logAttempt}>
            <h2>Login</h2>
            <label> Email: </label>
            <input type="text" onChange={(event) => setEmail(event.target.value)} />
            <label> Password: </label>
            <input type="text" onChange={(event) => setPassword(event.target.value)} />
            <button className="submit_log_btn" type="submit" onBlur={() => setIsVisible(false)}>
                Submit
            </button>
            {errorMsg ? (
                <div>
                    <span id="err_msg" className={`popup ${isVisible ? 'show' : ''}`}>
                        {errorMsg}
                    </span>
                </div>
            ) : null}
            <div>Forgot your password?</div>
            <Link>
                <h3>Reset password</h3>
            </Link>
        </form>
    );
}

export { Login };
