import { Request, Response } from 'express';
import axios from 'axios';

const env = require('dotenv').config({ path: `${__dirname}/../config/dev.env` });

async function searchIMDB(req: Request, res: Response) {
    const { search_term } = req.params;

    const options = {
        method: 'GET',
        url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${search_term}.json`,
        headers: {
            'x-rapidapi-key': `${env.parsed.IMDB_SEARCH_KEY}`,
            'x-rapidapi-host': `${env.parsed.IMDB_SEARCH_HOST}`,
        },
    };

    try {
        const response = await axios.request(options);
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
            q: `${search_term}`,
            type: 'video',
            key: env.parsed.GOOGLE_SEARCH_API,
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
            i: `${show_id}`,
            plot: 'full',
        },
    });

    res.send(response.data);
}

export { searchIMDB, youtubeAPI, watchMode, omdbAPI };