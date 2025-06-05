import axios from '../config/client.ts';
import type { ILoggedUser } from './types.tsx';

export async function fetchUser(): Promise<ILoggedUser> {
    return (await axios.get<ILoggedUser>('/user', { withCredentials: true })).data;
}
