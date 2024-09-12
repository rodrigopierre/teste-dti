import { Router } from 'express';
import { getReminders, createReminder, deleteReminder } from '../controllers/reminderController';

const router = Router();

// Rota para obter todos os lembretes
router.get('/reminders', getReminders);

// Rota para criar um novo lembrete
router.post('/reminders', createReminder);

// Rota para deletar um lembrete
router.delete('/reminders/:id', deleteReminder);

export default router;