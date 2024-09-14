import { deleteReminder } from '../controllers/reminderController';
import { Request, Response } from 'express';
import db from '../db';


jest.mock('../db', () => jest.fn());

describe('deleteReminder', () => {
  it('should delete a reminder successfully', async () => {
    const reminderId = 1;
    (db as unknown as jest.Mock).mockImplementation(() => ({
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockResolvedValue(1),
    }));

    const req = { params: { id: `${reminderId}` } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await deleteReminder(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: `Lembrete com id ${reminderId} deletado com sucesso.` });
  });


  it('should handle invalid ID', async () => {
    const req = { params: { id: 'abc' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await deleteReminder(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'ID inválido. Deve ser um número.' });
  });


  it('should handle reminder not found', async () => {
    (db as unknown as jest.Mock).mockImplementation(() => ({
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockResolvedValue(0),
    }));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await deleteReminder(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Lembrete não encontrado.' });
  });


  it('should handle errors when deleting a reminder', async () => {
    (db as unknown as jest.Mock).mockImplementation(() => ({
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockRejectedValue(new Error('Erro ao deletar lembrete')),
    }));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await deleteReminder(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar o lembrete.' });
  });
});