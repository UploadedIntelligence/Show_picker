import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jwt-decode';
import axios from 'axios';

const prisma = new PrismaClient();


async function registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const hashedPassword: string = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.users.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
            },
        });

        const token: string = jwt.sign(
            { id: user!.id, email: user!.email, username: user!.username },
            process.env.JWT_SECRET!,
            {
                expiresIn: '10s',
            },
        );

        res.cookie('user', token, { httpOnly: true, path: '/' });
        res.status(200).send();
    } catch (err) {
        res.status(400).send('Email already registered');
    }
}

async function logUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findUniqueOrThrow({
            where: { email },
        });

        if (!(await bcrypt.compare(password, user?.password || ''))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user!.id, email: user!.email, username: user!.username },
            process.env.JWT_SECRET!,
            {
                expiresIn: '15s',
            },
        );

        res.cookie('user', token, { httpOnly: true, path: '/' });
        res.status(200).send();
    } catch (err) {
        res.status(404).json('Invalid credentials');
    }
}

function getUser(req: Request, res: Response) {
    const user_token = req.cookies.user;
    try {
        const user: JwtPayload | string = jwt.verify(user_token, process.env.JWT_SECRET!);
        res.status(200).json({ user });
    } catch (e) {
        res.status(404).json({ message: 'User token expired, please log in again' });
    }
}

function logOut(req: Request, res: Response) {
    res.clearCookie('user', { path: '/' });
    res.status(200).json({ msg: 'Logged out' });
}

export { registerUser, logUser, getUser, logOut };
