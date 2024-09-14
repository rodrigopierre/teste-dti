import { getRemindersByDatePost } from '../controllers/reminderController';
import { Request, Response } from 'express';
import db from '../db';

// Testes da função de pegar todos os lembretes de uma data específica

jest.mock('../db', () => jest.fn());

describe('getRemindersByDatePost', () => {
  it('should return a list of reminders for a specific date', async () => {
    const mockDate = '14/09/2024';
    const mockReminders = [
      { id: 1, date: mockDate, name: 'Lembrete 1' },
      { id: 2, date: mockDate, name: 'Lembrete 2' },
    ];
    (db as unknown as jest.Mock).mockImplementation(() => ({
      where: jest.fn().mockResolvedValue(mockReminders),
    }));

    const req = {
      body: { date: mockDate },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getRemindersByDatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReminders);
  });


  it('should return a 400 error if date is not provided', async () => {
    const req = {
      body: {},
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getRemindersByDatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Data é obrigatória.' });
  });


  it('should return a 404 error if no reminders are found for the date', async () => {
    const mockDate = '14/09/2024';
    (db as unknown as jest.Mock).mockImplementation(() => ({
      where: jest.fn().mockResolvedValue([]),
    }));

    const req = {
      body: { date: mockDate },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getRemindersByDatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nenhum lembrete encontrado para essa data.' });
  });


  it('should handle errors when getting reminders for a specific date', async () => {
    const mockDate = '14/09/2024';
    (db as unknown as jest.Mock).mockImplementation(() => ({
      where: jest.fn().mockRejectedValue(new Error('Erro ao buscar lembretes')),
    }));

    const req = {
      body: { date: mockDate },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getRemindersByDatePost(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar os lembretes para a data fornecida.' });
  });
});