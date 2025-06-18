import axios from '../config/client.ts';
import { type AxiosResponse } from 'axios';

interface IIMDBResponse {
    id: string;
    qid: string;
    i: { imageUrl: string };
    l: string;
    y: number | undefined;
    s: string;
}

interface IYoutubeResponse {
    items: [{ id: { videoId: string } }];
}

interface IOMDBResponse {
    Plot: string;
}

interface IWatchModeResponse {
    name: string;
    web_url: string;
}

async function getMovieGluCinemas(movieName: string, geoLocation: string) {
    return await axios
        .get(`/movieglu/${movieName}/${geoLocation}`)
        .then((response) => response)
        .catch((err) => err.message);
}

async function searchCinemaUrl(cinemaName: string, geoLocation: string) {
    return await axios.get(`/getCinema/${cinemaName}/${geoLocation}`).then((result) => result.data);
}

async function searchIMDB(searchTerm: string): Promise<AxiosResponse<Array<IIMDBResponse | undefined>>> {
    return await axios.get(`/imdb/${searchTerm}`).then((result) => result);
}

async function searchYouTube(searchTerm: string): Promise<AxiosResponse<IYoutubeResponse | undefined>> {
    return await axios.get(`/youtube/${searchTerm}`).then((result) => result);
}

async function searchOMDB(show_id: string): Promise<AxiosResponse<IOMDBResponse | undefined>> {
    return await axios.get(`/omdb/${show_id}`).then((result) => result);
}

async function searchWatchMode(show_id: string): Promise<AxiosResponse<Array<IWatchModeResponse> | undefined>> {
    return await axios.get(`/watchmode/${show_id}`).then((result) => result);
}

export {
    getMovieGluCinemas,
    searchCinemaUrl,
    searchIMDB,
    searchYouTube,
    searchOMDB,
    searchWatchMode,
    type IIMDBResponse,
};
