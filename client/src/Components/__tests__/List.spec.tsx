import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from '../List';
import { api } from '../../Services/api';

// Teste do componente List

jest.mock('../Day', () => ({ date }: { date: string }) => <div>{date}</div>);

jest.mock('../../Services/api', () => ({
  api: {
    get: jest.fn()
  }
}));

describe('List Component', () => {
  it('should render the List component and display dates', async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: [
        { date: '15/09/2024' },
        { date: '10/09/2024' },
        { date: '20/09/2024' }
      ]
    });
    
    render(<List />);

    await waitFor(() => {
      expect(screen.getByText('10/09/2024')).toBeInTheDocument();
      expect(screen.getByText('15/09/2024')).toBeInTheDocument();
      expect(screen.getByText('20/09/2024')).toBeInTheDocument();
    });
  });

  it('should sort dates chronologically', async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: [
        { date: '15/09/2024' },
        { date: '10/09/2024' },
        { date: '20/09/2024' }
      ]
    });

    render(<List />);
    
    await waitFor(() => {
      const dates = screen.getAllByText(/(\d{2}\/\d{2}\/\d{4})/).map(el => el.textContent);
      expect(dates).toEqual(['10/09/2024', '15/09/2024', '20/09/2024']);
    });
  });
});