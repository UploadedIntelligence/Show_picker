import React from 'react';
import type { ICurrentUserContext } from './contexts/current-user-context.ts';
import axios from 'axios';

interface LoggedUserProps {
    setLoggedUser: React.Dispatch<React.SetStateAction<ICurrentUserContext['loggedUser'] | null>>;
}

function Logout({ setLoggedUser }: LoggedUserProps) {
    setLoggedUser(null);
    axios.post('http://localhost:9000/logout', {}, { withCredentials: true });

    return (
        <>
            <>Successfully Logged out!</>
        </>
    );
}

export { Logout };
