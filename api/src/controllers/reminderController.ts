import { Request, Response } from 'express';
import db from '../db';


// Obter todos os lembretes
export const getReminders = async (req: Request, res: Response) => {
    try {
        const reminders = await db('reminders').select('*');
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os lembretes.' });
    }
};


// Criar um novo lembrete
export const createReminder = async (req: Request, res: Response) => {
    const { date, name } = req.body;
    try {
        const [id] = await db('reminders').insert({ date, name });
        res.status(201).json({ id, date, name });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o lembrete.' });
    }
};


// Deletar um lembrete
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


// Função para obter todas as datas únicas
export const getUniqueDates = async (req: Request, res: Response) => {
    try {
        // Buscar todas as datas únicas
        const uniqueDates = await db('reminders').distinct('date');

        // Retornar as datas
        res.status(200).json(uniqueDates);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter as datas únicas.' });
    }
};