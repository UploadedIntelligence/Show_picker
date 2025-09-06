import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jwt-decode';

const prisma = new PrismaClient();

interface IUser extends JwtPayload {
    id: number;
    email: string;
    username: string;
}

async function registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const hashedPassword: string = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
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
                expiresIn: '1500s',
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
        const user = await prisma.user.findUniqueOrThrow({
            where: { email },
        });

        if (!(await bcrypt.compare(password, user?.password || ''))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user!.id, email: user!.email, username: user!.username },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1500s',
            },
        );

        res.cookie('user', token, { httpOnly: true, path: '/' });
        res.status(200).send();
    } catch (err) {
        res.status(404).json('Invalid credentials');
    }
}

function getUser(req: Request, res: Response) {
    const user_token: string = req.cookies.user;
    try {
        const user = jwt.verify(user_token, process.env.JWT_SECRET!) as IUser;
        console.log('result', user.id);
        res.status(200).json({ user });
    } catch (err) {
        res.status(404).json({ message: 'User token expired, please log in again' });
    }
}

async function getUserWatchLists(req: Request, res: Response) {
    const user_token = req.cookies.user;
    console.log('in server');
    try {
        const user = jwt.verify(user_token, process.env.JWT_SECRET!) as IUser;
        const watch_lists = await prisma.watchList.findMany({
            where: {
                userId: user.id,
            },
        });

        res.status(200).json({ watch_lists });
    } catch (err) {
        res.status(404).json({ message: 'User token expired, please log in again' });
    }
}

async function createWatchList(req: Request, res: Response) {
    const user_token = req.cookies.user;
    const { list_name } = req.body;
    console.log(list_name);
    console.log('creating...', user_token);

    try {
        const user = jwt.verify(user_token, process.env.JWT_SECRET!) as IUser;
        console.log('user logged success', user);
        const new_list = await prisma.watchList.create({
            data: {
                name: list_name,
                userId: user.id,
            },
        });
        console.log(new_list, 'created');
        res.status(200).json({ new_list });
    } catch (err) {
        res.status(404).json({ message: 'User token expired, please log in again' });
    }
}

function logOut(req: Request, res: Response) {
    res.clearCookie('user', { path: '/' });
    res.status(200).json({ msg: 'Logged out' });
}

export { registerUser, logUser, getUser, logOut, getUserWatchLists, createWatchList };
