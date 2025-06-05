import axios from 'axios';

function Logout({ onLogOut }: { onLogOut: () => void }) {
    axios.post('http://localhost:9000/logout', {}, { withCredentials: true });
    onLogOut();
    return (
        <>
            <>Successfully Logged out!</>
        </>
    );
}

export { Logout };
