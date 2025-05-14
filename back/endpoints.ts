import express from 'express'
import { registerUser } from "./controllers/users.controller";

const app = express()

app.use(express.json())
app.post('/register', registerUser)

app.listen(9000, () => {
    console.log('Now listening port 9000')
})