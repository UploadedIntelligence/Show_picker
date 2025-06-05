import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from './config/client.ts';

function Login({ onSuccessfulLogin }: { onSuccessfulLogin: () => void }) {
    const navigate = useNavigate();
    const {
        register,
        watch,
        formState: { isValid, errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const email = watch('email');
    const password = watch('password');
    const [errorMsg, setErrMsg] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function logAttempt() {
        axios
            .post<{
                email: string;
                username: string;
                id: number;
            }>(
                '/login',
                {
                    email,
                    password,
                },
                { withCredentials: true },
            )
            .then(() => {
                onSuccessfulLogin();
                navigate('/');
            })
            .catch((err) => {
                setErrMsg(err.response.data);
                setIsVisible(true);
            });
    }

    return (
        <form className="login" action={logAttempt}>
            <Typography variant="h4" sx={{ padding: 2 }}>
                Login
            </Typography>
            <TextField
                label="Email"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                autoComplete="off"
                {...register('email', { required: 'Field required' })}
            />
            <TextField
                label="Password"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                autoComplete="off"
                {...register('password', { required: 'Field required' })}
            />
            <Button
                className="submit_log_btn"
                type="submit"
                disabled={!isValid}
                onBlur={() => setIsVisible(false)}
                variant="contained"
            >
                Submit
            </Button>
            {isVisible ? (
                <Alert severity="error" variant="filled">
                    {errorMsg}
                </Alert>
            ) : null}
            <Link to="reset">
                <Typography variant="h6">Reset password</Typography>
            </Link>
        </form>
    );
}

export { Login };
