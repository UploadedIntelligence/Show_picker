import {queryRegister} from "../models/users.model";
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body
    console.log('here1')

    const user = await prisma.users.create( {
        data: {
            email: email,
            username: username,
            password: password
        }
    })

    res.status(204).json({user})
}

export { registerUser }