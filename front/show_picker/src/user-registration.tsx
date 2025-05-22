import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, LinearProgress, TextField, Tooltip, Typography } from '@mui/material';

function UserRegistration() {
    const [strength, setStrength] = useState(0);

    const [username, setUsername] = useState<string | null>(null);
    const [userErr, setUserErr] = useState<string | null>(null);

    const [email, setEmail] = useState<string | null>(null);
    const [emailErr, setEmailErr] = useState<string | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [passErr, setPassErr] = useState<string | null>(null);

    const [disableButton, setDisableButton] = useState(false);

    const password_tooltip =
        'A strong password contains:\n' +
        'At least 8 characters\n' +
        'One upper case and one lower case letter\n' +
        'One or more digits\n' +
        'One or more symbols, such as #$%!';

    useEffect(() => {
        setUserErr(username && /\W/.test(username) ? 'Username must contain only letters and numbers' : null);
    }, [username]);

    useEffect(() => {
        setEmailErr(email && !/^[\w.-]+@[\w-]+\.[\w.-]+$/.test(email) ? 'Email must be in the format text@domain.com' : null);
    }, [email]);

    useEffect(() => {
        const regexes: Array<RegExp> = [/\S{8,}/, /[a-z]/, /[A-Z]/, /\d/, /[^\w\s]/];

        if (password) {
            const result = regexes.reduce((accum: number, curr: RegExp): number => {
                return accum + Number(curr.test(password));
            }, 0);

            if (/\s/.test(password)) {
                setPassErr('Password must NOT contain space');
            } else {
                setPassErr(null);
            }
            setStrength(result * (100 / regexes.length));
        } else {
            setStrength(0);
        }
    }, [password]);

    useEffect(() => {
        if (strength === 100 && !passErr && !emailErr && !userErr) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [strength, passErr, emailErr, userErr]);

    function registerUser() {
        axios
            .post('http://localhost:9000/register', {
                username,
                email,
                password,
            })
            .then((user) => console.log(user));
    }

    return (
        <form className="register" onSubmit={registerUser}>
            <Typography variant="h4">Register</Typography>
            <TextField
                label="Username"
                error={!!userErr}
                helperText={userErr}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            ></TextField>

            <TextField
                label="Email"
                error={!!emailErr}
                helperText={emailErr}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            ></TextField>

            <TextField
                label="Password"
                error={!!passErr}
                helperText={passErr}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            ></TextField>

            <Tooltip
                placement="top"
                title={password_tooltip.split('\n').map((line) => (
                    <Typography fontSize="14px">
                        {line}
                        <br />
                    </Typography>
                ))}
            >
                <Typography>ℹ️ Strength: </Typography>
            </Tooltip>
            <LinearProgress variant="determinate" value={strength}></LinearProgress>
            <Button type="submit" disabled={disableButton} variant="contained">
                Submit
            </Button>
        </form>
    );
}

export { UserRegistration };
