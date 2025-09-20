import axios from '../config/client.ts';
import type { ILoggedUser } from '../utilities/types.tsx';

export async function fetchUser(): Promise<ILoggedUser> {
    try {
        return (await axios.get<ILoggedUser>('/user', { withCredentials: true })).data;
    } catch (err) {
        return null
    }
}
