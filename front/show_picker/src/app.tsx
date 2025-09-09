import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { UserLogTest } from './components/user-log-test.tsx';
import { LoginPage } from './pages/login-page.tsx';
import { UserRegistrationPage } from './pages/user-registration-page.tsx';
import { CurrentUserContext, type ICurrentUserContext } from './contexts/current-user-context.ts';
import { LogoutPage } from './pages/logout-page.tsx';
import { createTheme } from '@mui/material';
import { NavBar } from './components/nav-bar.tsx';
import { ThemeProvider } from '@emotion/react';
import { green } from '@mui/material/colors';
import { SearchResult } from './components/search-result.tsx';
import { fetchUser } from './api/fetchUser.ts';
import { GeoLocationContext } from './contexts/geo-location-context.ts';
import { WatchLists } from './pages/watch-lists.tsx';

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
    const [geoLocation, setGeoLocation] = useState<string | null>(null);

    async function initialiseUser() {
        setLoggedUser((await fetchUser()).user);
    }

    function logOut() {
        setLoggedUser(null);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setGeoLocation(`${latitude};${longitude}`);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GeoLocationContext.Provider value={geoLocation}>
                <CurrentUserContext.Provider value={{ loggedUser }}>
                    <NavBar isAuthenticated={!!loggedUser} />
                    <Routes>
                        <Route path="" element={<UserLogTest />}></Route>
                        <Route path="/login" element={<LoginPage onSuccessfulLogin={initialiseUser} />} />
                        <Route path="/logout" element={<LogoutPage onLogOut={logOut} />} />
                        <Route path="/register" element={<UserRegistrationPage onRegister={initialiseUser} />} />
                        <Route path="/search" element={<SearchResult />} />
                        <Route path="/watchlist" element={<WatchLists />} />
                    </Routes>
                </CurrentUserContext.Provider>
            </GeoLocationContext.Provider>
        </ThemeProvider>
    );
}

export default App;
