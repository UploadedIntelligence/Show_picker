import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, LinearProgress, TextField, Tooltip, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

type RegisterForm = {
    username: string;
    email: string;
    password: string;
};

function UserRegistration() {
    const [strength, setStrength] = useState(0);

    const {
        register,
        trigger,
        watch,
        formState: { errors, dirtyFields, isValid },
    } = useForm<RegisterForm>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const username: string = watch('username');
    const email: string = watch('email');
    const password: string = watch('password');

    useEffect(() => {
        trigger(['username', 'password']);
    }, [username, password]);

    const password_tooltip =
        'A strong password contains:\n' +
        'At least 8 characters\n' +
        'One upper case and one lower case letter\n' +
        'One or more digits\n' +
        'One or more symbols, such as #$%!';

    function passwordValidation(password: string) {
        const regexes: Array<RegExp> = [/\S{8,}/, /[a-z]/, /[A-Z]/, /\d/, /[^\w\s]/];
        if (password) {
            const result = regexes.reduce((accum: number, curr: RegExp): number => {
                return accum + Number(curr.test(password));
            }, 0);

            setStrength(result * (100 / regexes.length));

            if (/\s/.test(password)) {
                return 'SPACE not allowed';
            }

            return true;
        } else {
            setStrength(0);
            return false;
        }
    }

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
            <Typography variant="h4" sx={{ padding: 2 }}>
                Register
            </Typography>
            <TextField
                label="Username"
                error={!!errors.username && dirtyFields.username}
                helperText={errors.username?.message}
                {...register('username', {
                    required: true,
                    pattern: {
                        value: /^\w+$/,
                        message: 'Only letters and numbers',
                    },
                })}
                autoComplete="off"
            ></TextField>

            <TextField
                label="Email"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...register('email', {
                    required: true,
                    pattern: {
                        value: /^[\w.-]+@[\w-]+\.[\w.-]+$/,
                        message: 'Invalid email',
                    },
                })}
                onBlur={() => trigger('email')}
                autoComplete="off"
            ></TextField>

            <TextField
                label="Password"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                {...register('password', {
                    required: true,
                    validate: passwordValidation,
                })}
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
            <Button type="submit" disabled={!(isValid && strength === 100)} variant="contained">
                Submit
            </Button>
        </form>
    );
}

export { UserRegistration };
