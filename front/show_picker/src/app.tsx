import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { MainPage } from './main-page.tsx';
import { Login } from './login.tsx';
import { UserRegistration } from './user-registration.tsx';
import { CurrentUserContext, type ICurrentUserContext } from './contexts/current-user-context.ts';
import { Logout } from './logout.tsx';
import { createTheme } from '@mui/material';
import { NavBar } from './nav-bar/nav-bar.tsx';
import { ThemeProvider } from '@emotion/react';
import { green } from '@mui/material/colors';
import { SearchResult } from './search-result.tsx';
import { fetchUser } from './utilities/fetchUser.ts';

function App() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: green[700],
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontWeight: '600',
                    },
                },
            },
        },
    });

    const [loggedUser, setLoggedUser] = useState<ICurrentUserContext['loggedUser'] | null>(null);

    async function initialiseUser() {
        setLoggedUser((await fetchUser()).user);
    }

    function logOut() {
        setLoggedUser(null);
    }

    return (
        <ThemeProvider theme={theme}>
            <CurrentUserContext.Provider value={{ loggedUser }}>
                <NavBar isAuthenticated={!!loggedUser} />
                <Routes>
                    <Route path="" element={<MainPage />}></Route>
                    <Route path="/login" element={<Login onSuccessfulLogin={initialiseUser} />} />
                    <Route path="/logout" element={<Logout onLogOut={logOut} />} />
                    <Route path="/register" element={<UserRegistration onRegister={initialiseUser} />} />
                    <Route path="/search" element={<SearchResult />} />
                </Routes>
            </CurrentUserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
