import axios from '../config/client.ts';

function LogoutPage({ onLogOut }: { onLogOut: () => void }) {
    axios.post('/logout', {}, { withCredentials: true });
    onLogOut();
    return (
        <>
            <>Successfully Logged out!</>
        </>
    );
}

export { LogoutPage };
