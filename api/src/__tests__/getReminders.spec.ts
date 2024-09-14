import { getReminders } from '../controllers/reminderController';
import { Request, Response } from 'express';
import db from '../db';


jest.mock('../db', () => jest.fn());

describe('getReminders', () => {
  it('should return a list of reminders', async () => {
    const mockReminders = [{ id: 1, date: '2024/09/10', name: 'Lembrete 1' }];
    (db as unknown as jest.Mock).mockImplementation(() => ({
      select: jest.fn().mockResolvedValue(mockReminders),
    }));

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getReminders(req, res);

    expect(res.json).toHaveBeenCalledWith(mockReminders);
    expect(res.status).not.toHaveBeenCalled();
  });

  //teste de erro
  it('should handle errors', async () => {
    (db as unknown as jest.Mock).mockImplementation(() => ({
      select: jest.fn().mockRejectedValue(new Error('Erro')),
    }));

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getReminders(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter os lembretes.' });
  });
});