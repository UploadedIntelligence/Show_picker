import {queryRegister} from "../models/users.model";
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

async function registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body
    console.log('here1')
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.users.create( {
        data: {
            email: email,
            username: username,
            password: hashedPassword
        }
    })

    res.status(204).json({user})
}

async function logUser(req: Request, res: Response) {
    const { email, password } = req.body
    console.log('logging now')

    const user = await prisma.users.findUnique( {
        where: { email }
    })

    const attemptValid = await bcrypt.compare(password, user?.password || '')
    console.log(attemptValid)
    if (attemptValid) {
        const token = jwt.sign(
            {user},
            process.env.JWT_SECRET!
        )

        console.log(token)
        res.status(204).json({token})
    } else {
        res.status(404).json('Invalid credentials')
    }
}

export { registerUser, logUser }