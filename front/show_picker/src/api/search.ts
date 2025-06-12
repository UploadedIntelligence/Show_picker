import axios from '../config/client.ts';
import { type AxiosResponse } from 'axios';

interface IYoutubeResponse {
    items: [{ id: { videoId: string } }]
}

// If not used more than once move into nav-bar
async function searchIMDB(searchTerm: string) {
    return await axios
        .get(`/imdb/${ searchTerm }`)
        .then((result) => result);
}

async function searchYouTube(searchTerm: string): Promise<AxiosResponse<IYoutubeResponse>> {
    return await axios.get(
    `/youtube/${searchTerm}`).then((result) => result);
}

async function searchOMDB(show_id: string) {
    return await axios.get(`/omdb/${show_id}`).then((result) => result);
}

async function searchWatchMode(show_id: string) {
    return await axios.get(`/watchmode/${show_id}`).then((result) => result);
}

export { searchIMDB, searchYouTube, searchOMDB, searchWatchMode };
