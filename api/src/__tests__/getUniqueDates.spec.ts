import { getUniqueDates } from '../controllers/reminderController';
import { Request, Response } from 'express';
import db from '../db';


jest.mock('../db', () => jest.fn());

describe('getUniqueDates', () => {
  it('should return a list of unique dates successfully', async () => {
    const mockUniqueDates = [
      { date: '14/09/2024' },
      { date: '15/09/2024' },
    ];
    (db as unknown as jest.Mock).mockImplementation(() => ({
      distinct: jest.fn().mockResolvedValue(mockUniqueDates),
    }));

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getUniqueDates(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUniqueDates);
  });


  it('should handle errors when getting unique dates', async () => {
    (db as unknown as jest.Mock).mockImplementation(() => ({
      distinct: jest.fn().mockRejectedValue(new Error('Erro ao obter datas únicas')),
    }));

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await getUniqueDates(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter as datas únicas.' });
  });
});