import { Router } from 'express';
import { getReminders, createReminder, deleteReminder, getUniqueDates, getRemindersByDatePost } from '../controllers/reminderController';

const router = Router();

// Rota para obter todos os lembretes
router.get('/reminders', getReminders);

// Rota para criar um novo lembrete
router.post('/reminders', createReminder);

// Rota para deletar um lembrete
router.delete('/reminders/:id', deleteReminder);

// Rota para obter todas as datas únicas
router.get('/reminders/dates', getUniqueDates);

// Rota para obter lembretes por data específica
router.post('/reminders/date', getRemindersByDatePost);

export default router;