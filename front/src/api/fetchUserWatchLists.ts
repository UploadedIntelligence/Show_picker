import axios from '../config/client.ts';
import type { WatchList } from "../utilities/types.tsx";

export async function fetchUserWatchLists(): Promise<Array<WatchList>> {
    return (await axios.get('/watchlist', { withCredentials: true })).data;
}