import React, {useState, useEffect} from 'react'
import './App.css'
import {UserRegistration} from "./UserRegistration.tsx";
import {Login} from "./Login.tsx";

function App() {

    return (
        <>
            <h1>Show Picker</h1>
            <h2>Register</h2>
            <UserRegistration/>
            <h2>Login</h2>
            <Login/>
        </>
    )
}

export default App
