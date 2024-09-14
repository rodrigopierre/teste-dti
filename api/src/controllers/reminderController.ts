import { Request, Response } from 'express';
import db from '../db';


// Retorna todos os lembretes
export const getReminders = async (req: Request, res: Response) => {
    try {
        const reminders = await db('reminders').select('*');
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os lembretes.' });
    }
};


// Cria um novo lembrete
export const createReminder = async (req: Request, res: Response) => {
    const { date, name } = req.body;
    try {
        const [id] = await db('reminders').insert({ date, name });
        res.status(201).json({ id, date, name });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o lembrete.' });
    }
};


// Deleta um lembrete pelo id
export const deleteReminder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10); 

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido. Deve ser um número.' });
    }

    try {
        const deletedRows = await db('reminders').where({ id }).del();

        if (deletedRows > 0) {
            res.status(200).json({ message: `Lembrete com id ${id} deletado com sucesso.` });
        } else {
            res.status(404).json({ error: 'Lembrete não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o lembrete.' });
    }
};


// Retorna todas as datas únicas
export const getUniqueDates = async (req: Request, res: Response) => {
    try {
        const uniqueDates = await db('reminders').distinct('date');

        res.status(200).json(uniqueDates);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter as datas únicas.' });
    }
};


// Retorna todos os lembretes de uma data específica
export const getRemindersByDatePost = async (req: Request, res: Response) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ error: 'Data é obrigatória.' });
    }

    try {
        const reminders = await db('reminders').where({ date: date });

        if (reminders.length === 0) {
            return res.status(404).json({ error: 'Nenhum lembrete encontrado para essa data.' });
        }

        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os lembretes para a data fornecida.' });
    }
};