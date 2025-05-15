import express from 'express';
import cors from 'cors';
import { logUser, registerUser } from './controllers/users.controller';

const app = express();

app.use(cors());
app.use(express.json());
app.post('/register', registerUser);
app.post('/login', logUser);

app.listen(process.env.APP_PORT, () => {
    console.log(`Now listening port ${process.env.APP_PORT}`);
});
