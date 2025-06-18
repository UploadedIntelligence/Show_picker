import '../styles/nav-bar.scss';
import { alpha, AppBar, Button, InputBase, styled, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { type IIMDBResponse, searchIMDB } from '../api/search.ts';
import { isString } from '../utilities/is-string.ts';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import type { AxiosResponse } from 'axios';

function NavBar({ isAuthenticated }: { isAuthenticated: boolean }) {
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);

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
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '14ch',
                },
            },
        },
    }));

    async function submitSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const search_input = form.get('search');
        if (isString(search_input)) {
            const result: AxiosResponse<Array<IIMDBResponse | undefined>> = await searchIMDB(search_input);
            navigate('/search', { state: result.data });
        }
    }

    return (
        <AppBar className="NavBar-main" position="static">
            <Toolbar className="NavBar-toolbar" variant="dense" sx={{ display: 'inline', minHeight: 0 }}>
                <div className="NavBar-content">
                    <Link to="/">
                        <Button>Home</Button>
                    </Link>
                    <Search onClick={() => ref.current?.focus()}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form
                            onSubmit={(event) => {
                                submitSearch(event);
                            }}
                        >
                            <StyledInputBase
                                inputRef={ref}
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
                            <Link to="/logout">
                                <Button>Log out</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export { NavBar };
