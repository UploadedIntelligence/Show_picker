import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/current-user-context.ts';

function UserLogTest() {
    const currentUserContext = useContext(CurrentUserContext);
    const username: string | undefined = currentUserContext?.loggedUser?.username;

    return (
        <>
            <div>{username !== undefined ? `Welcome ${username}` : `No user logged`}</div>
            <h1>Show Picker</h1>
        </>
    );
}

export { UserLogTest };
