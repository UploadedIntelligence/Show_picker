import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashedPassword,
        },
    });

    res.status(204).json({ user });
}

async function logUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    const attemptValid = await bcrypt.compare(password, user?.password || '');

    if (attemptValid) {
        const token = jwt.sign(
            { id: user!.id, email: user!.email, username: user!.username },
            process.env.JWT_SECRET!,
        );

        res.status(200).json({ token });
    } else {
        res.status(404).json('Invalid credentials');
    }
}

export { registerUser, logUser };
