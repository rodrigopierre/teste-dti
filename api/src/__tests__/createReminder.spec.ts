import { createReminder } from '../controllers/reminderController';
import { Request, Response } from 'express';
import db from '../db';


jest.mock('../db', () => jest.fn());

describe('createReminder', () => {
  it('should create a new reminder successfully', async () => {
    const mockReminder = { id: 1, date: '14/09/2024', name: 'Novo Lembrete' };
    (db as unknown as jest.Mock).mockImplementation(() => ({
      insert: jest.fn().mockResolvedValue([mockReminder.id]),
    }));

    const req = { body: { date: mockReminder.date, name: mockReminder.name } } as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await createReminder(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockReminder);
  });

  
  it('should handle errors when creating a reminder', async () => {
    (db as unknown as jest.Mock).mockImplementation(() => ({
      insert: jest.fn().mockRejectedValue(new Error('Erro ao criar lembrete')),
    }));
    const req = { body: { date: '14/09/2024', name: 'Novo Lembrete' } } as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await createReminder(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar o lembrete.' });
  });
});