import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { MainPage } from './main-page.tsx';
import { Login } from './login.tsx';
import { NavBar } from './nav-bar/nav-bar.tsx';
import { UserRegistration } from './user-registration.tsx';
import axios from 'axios';
import { CurrentUserContext, type ICurrentUserContext } from './contexts/current-user-context.ts';
import { Logout } from './logout.tsx';

function App() {
    const [loggedUser, setLoggedUser] = useState<ICurrentUserContext['loggedUser'] | null>(null);

    useEffect(() => {
        async function fetchUser() {
            await axios
                .get<{
                    user: {
                        username: string;
                        email: string;
                        id: number;
                    };
                }>('http://localhost:9000/user', { withCredentials: true })
                .then((res) => {
                    setLoggedUser(res.data.user);
                })
                .catch((err) => console.log(err.response.data.message));
        }
        fetchUser();
    }, []);

    return (
        <CurrentUserContext.Provider value={{ loggedUser }}>
            <NavBar isAuthenticated={!!loggedUser} />
            <Routes>
                <Route path="" element={<MainPage />}></Route>
                <Route path="/login" element={<Login setLoggedUser={setLoggedUser} />} />
                <Route path="/logout" element={<Logout setLoggedUser={setLoggedUser} />} />
                <Route path="/register" element={<UserRegistration />} />
            </Routes>
        </CurrentUserContext.Provider>
    );
}

export default App;
