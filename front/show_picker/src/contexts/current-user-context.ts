import { createContext } from 'react';
import { type ILoggedUser } from '../utilities/types'

export const CurrentUserContext = createContext<ILoggedUser | null>(null);
