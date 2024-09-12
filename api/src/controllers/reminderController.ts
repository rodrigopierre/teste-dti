import { Request, Response } from 'express';

let reminders = [
    { id: 1, date: "01/01/2025", name: 'Reminder 1' },
    { id: 2, date: "12/12/2024", name: 'Reminder 2' }
];

// Função para obter lembretes
export const getReminders = (req: Request, res: Response) => {
    res.json(reminders);
};

// Função para adicionar um lembrete
export const createReminder = (req: Request, res: Response) => {
    const { date, name } = req.body;
    const newReminder = { id: reminders.length + 1, date, name };
    reminders.push(newReminder);
    res.status(201).json(newReminder);
};