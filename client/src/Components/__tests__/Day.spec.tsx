import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Day from '../Day';
import { api } from '../../Services/api';

// Teste do componente Day

jest.mock('../../Services/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('Day Component', () => {
  const mockReminders = [
    { date: '14/09/2024', id: 1, name: 'Reminder 1' },
    { date: '14/09/2024', id: 2, name: 'Reminder 2' },
  ];

  beforeEach(() => {
    (api.post as jest.Mock).mockResolvedValue({ data: mockReminders });
  });

  test('renders the date and reminders', async () => {
    render(<Day date="14/09/2024" />);
    expect(screen.getByText('14/09/2024')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Reminder 1')).toBeInTheDocument();
      expect(screen.getByText('Reminder 2')).toBeInTheDocument();
    });
  });

  test('handles API error', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Network Error'));
    render(<Day date="14/09/2024" />);
    expect(screen.getByText('14/09/2024')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Reminder 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Reminder 2')).not.toBeInTheDocument();
    });
  });
});