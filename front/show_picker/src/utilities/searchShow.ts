import axios from 'axios';

export async function searchShow(searchTerm: string) {
    return await axios
        .post<{
            searchTerm: string;
        }>('http://localhost:9000/search', { search_term: searchTerm })
        .then((result) => result);
}
