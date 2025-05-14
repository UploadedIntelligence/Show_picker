import express from 'express'
import cors from 'cors'
import { registerUser } from "./controllers/users.controller";

const app = express()

app.use(cors())
app.use(express.json())
app.post('/register', registerUser)

app.listen(9000, () => {
    console.log('Now listening port 9000')
})