import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app.tsx';
import { fetchUser } from "./api/fetchUser.ts";
import type { ILoggedUser } from "./utilities/types.tsx";
import { CurrentUserContext } from "./contexts/current-user-context.ts";

async function bootstrap() {
    const user: ILoggedUser = await fetchUser()

    createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <CurrentUserContext.Provider value={user}>
                <App userOrGuest={user}/>
            </CurrentUserContext.Provider>
        </BrowserRouter>
    </StrictMode>
    );
}
bootstrap();