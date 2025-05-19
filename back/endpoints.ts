import express from 'express';
import cors from 'cors';
import { getUser, logOut, logUser, registerUser } from './controllers/users.controller';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get('/user', getUser);
app.post('/logout', logOut);
app.post('/register', registerUser);
app.post('/login', logUser);

app.listen(process.env.APP_PORT, () => {
    console.log(`Now listening port ${process.env.APP_PORT}`);
});
