import { createContext } from 'react';

export interface ICurrentUserContext {
    loggedUser: { username: string; email: string; id: number } | null;
}

export const CurrentUserContext = createContext<ICurrentUserContext | undefined>(undefined);
