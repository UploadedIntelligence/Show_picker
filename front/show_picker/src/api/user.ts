import axios from '../config/client.ts';
import type { ILoggedUser } from '../utilities/types.tsx';

export async function user(): Promise<ILoggedUser> {
    return (await axios.get<ILoggedUser>('/user', { withCredentials: true })).data;
}
