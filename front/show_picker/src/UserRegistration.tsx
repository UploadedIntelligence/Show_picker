import React, {useState} from "react";
import axios from "axios";

function UserRegistration() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function registerUser() {
        axios.post('http://localhost:9000/register', {
            username, email, password
        }).then(user => console.log(user))
    }
    return (
        <form className="register" action={registerUser}>
            <label> Username: </label>
            <input type='text' onChange={updateUsername}/>
            <label> Email: </label>
            <input type='text' onChange={updateEmail}/>
            <label> Password: </label>
            <input type='text' onChange={updatePassword}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export { UserRegistration }