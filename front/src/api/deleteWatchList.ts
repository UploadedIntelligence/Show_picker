import axios from '../config/client.ts';

export async function deleteWatchList(list_id: number) {
    return axios.delete(`/watchlist/${list_id}`, { withCredentials: true})
}