import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reminder from '../Reminder';
import { api } from '../../Services/api';

// Teste do Componente Reminder

jest.mock('../../Services/api', () => ({
  api: {
    delete: jest.fn(),
  },
}));

describe('Reminder Component', () => {
  const mockTitle = 'Test Reminder';
  const mockId = 1;

  beforeEach(() => {
    (api.delete as jest.Mock).mockResolvedValue({ status: 200 });
  });

  test('renders the reminder and opens/closes the modal', () => {
    render(<Reminder title={mockTitle} id={mockId} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();

    const cancelButton = screen.getByText('cancel');
    fireEvent.click(cancelButton);
    expect(screen.getByText('Tem certeza que deseja excluir esse lembrete?')).toBeInTheDocument();

    const cancelButtonInModal = screen.getByText('Cancelar');
    fireEvent.click(cancelButtonInModal);
    expect(screen.queryByText('Tem certeza que deseja excluir esse lembrete?')).not.toBeInTheDocument();
  });

  test('deletes the reminder on confirm', async () => {
    render(<Reminder title={mockTitle} id={mockId} />);

    const cancelButton = screen.getByText('cancel');
    fireEvent.click(cancelButton);

    const deleteButton = screen.getByText('Excluir');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith(`/reminders/${mockId}`);
    });
  });
});