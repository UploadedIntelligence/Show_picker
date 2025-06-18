import { Request, Response } from 'express';
import axios from 'axios';

const env = require('dotenv').config({ path: `${__dirname}/../config/dev.env` });

async function googleCinema(req: Request, res: Response) {
    const { cinema_query, geo_location } = req.params;

    const cinema_url = await axios
        .get('https://customsearch.googleapis.com/customsearch/v1', {
            params: {
                key: env.parsed.GOOGLE_SEARCH_KEY,
                cx: env.parsed.GOOGLE_ENGINE_ID,
                q: cinema_query,
                gl: geo_location,
                num: 1,
                hl: 'en',
            },
        })
        .then((res) => res.data.items[0].link);

    res.status(200).json(cinema_url);
}

async function searchMovieGlu(req: Request, res: Response) {
    const { movie_name, geo_location } = req.params;

    const date_today = new Date().toISOString().slice(0, 10);

    const glu_headers = {
        'x-api-key': env.parsed.MOVIEGLU_API_KEY,
        authorization: env.parsed.MOVIEGLU_AUTH,
        geolocation: '-22.0;14.0',
        territory: 'XX',
        'api-version': 'v201',
        client: env.parsed.MOVIEGLU_CLIENT,
        'device-datetime': date_today,
    };

    try {
        const movie_id = await axios
            .get('https://api-gate2.movieglu.com/filmLiveSearch', {
                headers: glu_headers,
                params: {
                    query: movie_name,
                    n: '1',
                },
            })
            .then((res) => res.data.films[0].film_id);

        const cinemas = await axios
            .get('https://api-gate2.movieglu.com/filmShowTimes', {
                headers: glu_headers,
                params: {
                    film_id: movie_id,
                    n: '4',
                    date: date_today,
                },
            })
            .then((res) => res.data.cinemas);

        res.status(200).json(cinemas);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch from MovieGlu' });
    }
}

async function searchIMDB(req: Request, res: Response) {
    const { search_term } = req.params;

    try {
        const response = await axios.get(
            `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${search_term}.json`,
            {
                headers: {
                    'x-rapidapi-key': env.parsed.IMDB_SEARCH_KEY,
                    'x-rapidapi-host': env.parsed.IMDB_SEARCH_HOST,
                },
            },
        );
        const data = response.data.d;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch from IMDB' });
    }
}

async function youtubeAPI(req: Request, res: Response) {
    const { search_term } = req.params;

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
            part: 'snippet',
            q: search_term,
            type: 'video',
            key: env.parsed.GOOGLE_SEARCH_KEY,
            relevanceLanguage: 'en',
        },
    });
    res.send(response.data);
}

async function watchMode(req: Request, res: Response) {
    const { show_id } = req.params;
    // const response = { data: 'Changed to not run out of free requests' };
    const response = await axios.get(`https://api.watchmode.com/v1/title/${show_id}/sources`, {
        params: {
            apiKey: env.parsed.WATCHMODE_API_KEY,
            regions: 'GB',
        },
    });

    res.send(response.data);
}

async function omdbAPI(req: Request, res: Response) {
    const { show_id } = req.params;
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: env.parsed.OMDB_API_KEY,
            i: show_id,
            plot: 'full',
        },
    });

    res.send(response.data);
}

export { searchIMDB, youtubeAPI, watchMode, omdbAPI, searchMovieGlu, googleCinema };
