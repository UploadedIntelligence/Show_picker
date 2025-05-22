import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import type { ICurrentUserContext } from './contexts/current-user-context.ts';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

interface LoggedUserProps {
    setLoggedUser: React.Dispatch<React.SetStateAction<ICurrentUserContext['loggedUser'] | null>>;
}

function Login({ setLoggedUser }: LoggedUserProps) {
    const ref = useRef(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [errorMsg, setErrMsg] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [emailErr, setEmailErr] = useState<string | null>(null);

    useEffect(() => {
        setEmailErr(email && !/^.+@.+\..+$/.test(email) ? 'Email must be in the format text@domain.com' : null);
    }, [email]);

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
        <form className="login" action={logAttempt} ref={ref}>
            <Typography variant="h4">Login</Typography>
            <TextField error={!!emailErr} helperText={emailErr} label="Email" onBlur={(event) => setEmail(event.target.value)} />
            <TextField label="Password" onChange={(event) => setPassword(event.target.value)} />
            <Button className="submit_log_btn" type="submit" onBlur={() => setIsVisible(false)} variant="contained">
                Submit
            </Button>
            {errorMsg ? (
                <Box>
                    <Typography id="err_msg" className={`popup ${isVisible ? 'show' : ''}`}>
                        {errorMsg}
                    </Typography>
                </Box>
            ) : null}
            <Link>
                <Typography variant="h6">Reset password</Typography>
            </Link>
        </form>
    );
}

export { Login };
