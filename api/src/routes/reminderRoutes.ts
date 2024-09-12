import { Router } from 'express';
import { getReminders, createReminder } from '../controllers/reminderController';

const router = Router();

// Rota para obter todos os lembretes
router.get('/reminders', getReminders);

// Rota para criar um novo lembrete
router.post('/reminders/create', createReminder);

export default router;