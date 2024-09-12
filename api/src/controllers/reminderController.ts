import { Request, Response } from 'express';
import db from '../db';

// Obter todos os lembretes
export const getReminders = async (req: Request, res: Response) => {
    const reminders = await db('reminders').select('*');
    res.json(reminders);
};

// Criar um novo lembrete
export const createReminder = async (req: Request, res: Response) => {
    const { date, name } = req.body;
    const [id] = await db('reminders').insert({ date, name });
    res.status(201).json({ id, date, name });
};