import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

function UserRegistration() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const strength_bar = useRef(null)
    const password_field = useRef(null)
    const user_field = useRef(null)

    const password_tooltip = 'A strong password contains:\n' +
        'At least 8 characters\n' +
        'One upper case and one lower case letter\n' +
        'One or more digits\n' +
        'One or more symbols, such as #$%!'

    useEffect(() => {
        if (/\W/.test(username)) {
            setDisableButton(true)
            user_field.current!.style.border = '2px solid red';
            user_field.current!.style.outline = 'none'
        } else {
            setDisableButton(false)
            user_field.current!.style.border = '';
            user_field.current!.style.outline = ''
        }

    }, [username]);

    useEffect(() => {
        let strength = 0

        if (password.length >= 8) strength += 1;

        if (/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) strength += 1;

        if (/\d/.test(password)) strength += 1;

        if (/[^\w\s]/.test(password)) strength += 1;

        if (/\s/.test(password)) {
            setDisableButton(true)
            password_field.current!.style.border = '2px solid red';
            password_field.current!.style.outline = 'none'
        } else {
            setDisableButton(false)
            password_field.current!.style.border = ''
            password_field.current!.style.outline = ''
        }

        strength_bar.current!.style.width = 25 * strength + '%'
    }, [password])

    function registerUser() {
        axios.post('http://localhost:9000/register', {
            username, email, password
        }).then(user => console.log(user))
    }
    return (
        <form className="register" onSubmit={registerUser}>
            <h2>Register</h2>
            <label> Username: </label>
            <input className='user_field' type='text' ref={user_field} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>

            <label> Email: </label>
            <input type='text' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>

            <label> Password: </label>
            <input className='password_field' type='text' ref={password_field} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
            <span title={password_tooltip}>ℹ️ Strength: </span>
            <div className='password_strength'>
                <div className='password_strength_bar' ref={strength_bar}></div>
            </div>

            <button className='submit_reg_btn' type='submit' disabled={disableButton}>Submit</button>
        </form>
    )
}

export { UserRegistration }