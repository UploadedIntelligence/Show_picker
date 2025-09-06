import express from 'express';
import cors from 'cors';
import {
    createWatchList,
    getUser,
    getUserWatchLists,
    logOut,
    logUser,
    registerUser,
} from './controllers/users.controller';
import {
    googleCinema,
    omdbAPI,
    searchIMDB,
    searchMovieGlu,
    watchMode,
    youtubeAPI,
} from './controllers/search.controller';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get('/user', getUser);
app.get('/watchlist', getUserWatchLists);
app.post('/watchlist', createWatchList);
app.post('/logout', logOut);
app.post('/register', registerUser);
app.post('/login', logUser);
app.get('/imdb/:search_term', searchIMDB);
app.get('/youtube/:search_term', youtubeAPI);
app.get('/movieglu/:movie_name/:geo_location', searchMovieGlu);
app.get('/omdb/:show_id', omdbAPI);
app.get('/watchmode/:show_id', watchMode);
app.get('/getCinema/:cinema_query/:geo_location', googleCinema);

app.listen(process.env.APP_PORT, () => {
    console.log(`Now listening port ${process.env.APP_PORT}`);
});
