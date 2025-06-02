import './nav-bar.scss';
import { alpha, AppBar, Button, InputBase, styled, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchShow } from '../searchShow.tsx';
import { isString } from '../utilities/is-string.ts';
import { useNavigate } from 'react-router-dom';

function NavBar({ isAuthenticated }: { isAuthenticated: boolean }) {
    let navigate = useNavigate();
    const Search = styled('div')(({ theme }) => ({
        display: 'flex',
        backgroundColor: alpha(theme.palette.primary.dark, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.dark, 0.25),
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 1),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(3)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    async function submitSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const search_input = form.get('search');
        if (isString(search_input)) {
            const result = await searchShow(search_input);
            navigate('/search', { state: result.data });
        }
    }

    return (
        <AppBar className="NavBar-main" position="static">
            <Toolbar className="NavBar-toolbar" variant="dense" sx={{ display: 'inline', minHeight: 0 }}>
                <div className="NavBar-content">
                    <Button href="/">Home</Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form
                            onSubmit={(event) => {
                                submitSearch(event);
                            }}
                        >
                            <StyledInputBase
                                name="search"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </form>
                    </Search>
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
                </div>
            </Toolbar>
        </AppBar>
    );
}

export { NavBar };
