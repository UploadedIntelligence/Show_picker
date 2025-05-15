import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

function UserRegistration() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const ref = useRef(null)

    const password_tooltip = 'A strong password contains:\n' +
        'At least 8 characters\n' +
        'One upper case and one lower case letter\n' +
        'One or more digits\n' +
        'One or more symbols, such as #$%!'

    useEffect(() => {
        let strength = 0

        if (password.length >= 8) {
            strength += 1;
        }

        if (/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) strength += 1;

        if (/\d/.test(password)) strength += 1;

        if (/[^\w\s]/.test(password)) strength += 1;

        if (/\s/.test(password)){
            console.log('invalid')
        }

        ref.current.style.width = 25 * strength + '%'
    }, [password])

    function registerUser() {
        axios.post('http://localhost:9000/register', {
            username, email, password
        }).then(user => console.log(user))
    }
    return (
        <form className="register" onSubmit={registerUser}>
            <label> Username: </label>
            <input type='text' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>

            <label> Email: </label>
            <input type='text' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>

            <label> Password: </label>
            <input type='text' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
            <span title={password_tooltip}>ℹ️ Strength: </span>
            <div className='password_strength'>
                <div className='password_strength_bar' ref={ref}></div>
            </div>

            <button className='submit_reg_btn' type='submit'>Submit</button>
        </form>
    )
}

export { UserRegistration }