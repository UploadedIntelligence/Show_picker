import express from 'express'
import cors from 'cors'
import { registerUser, logUser } from "./controllers/users.controller";

const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    console.log('hi')
})
app.post('/register', registerUser)
app.post('/login', logUser)

app.listen(9000, () => {
    console.log('Now listening port 9000')
})