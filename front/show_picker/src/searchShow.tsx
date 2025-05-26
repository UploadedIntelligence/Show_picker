import axios from 'axios';

export async function searchShow(searchTerm: string) {
    const options = {
        method: 'GET',
        url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${searchTerm}.json`,
        headers: {
            'x-rapidapi-key': 'aa1b0dd48bmsh7a4f626574eaa57p13e0b7jsn4524ee424782',
            'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}
