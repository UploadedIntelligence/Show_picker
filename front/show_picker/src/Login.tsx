import React, {useState} from "react";
import axios from 'axios'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userToken, setUserToken] = useState(null)

    function updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function logAttempt() {
        axios.post('http://localhost:9000/login', {
            email, password
        }).then(result =>
            setUserToken(result)
        )
    }

    return (
        <form action={logAttempt}>
            <label> Email: </label>
            <input type='text' onChange={updateEmail}/>
            <label> Password: </label>
            <input type='text' onChange={updatePassword}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export { Login }