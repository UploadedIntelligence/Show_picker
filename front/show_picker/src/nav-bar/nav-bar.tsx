import './nav-bar.scss';
import { AppBar, Button, Stack, Toolbar } from '@mui/material';

function NavBar({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <AppBar className="NavBar-main" position="static">
            <Toolbar className="NavBar-toolbar" variant="dense" sx={{ display: 'inline', minHeight: 0 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-evenly' }} spacing={4}>
                    <Button href="/">Home</Button>
                    <Button className="NavBar-button">Most popular</Button>
                    <Button>User picks</Button>
                    {isAuthenticated ? (
                        <>
                            <Button>Profile</Button>
                            <Button href="/logout">Log out</Button>
                        </>
                    ) : (
                        <>
                            <Button href="/register">Register</Button>
                            <Button href="/login">Login</Button>
                        </>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export { NavBar };
