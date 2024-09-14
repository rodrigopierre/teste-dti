import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

// Teste do componente Input

describe('Input Component', () => {
  test('renders correctly with title and placeholder', () => {
    render(<Input title="Data" placeholder="Enter date" />);
    expect(screen.getByText('Data')).toBeInTheDocument();
    
    const inputElement = screen.getByPlaceholderText('Enter date');
    expect(inputElement).toBeInTheDocument();
  });

  test('formats date correctly', () => {
    render(<Input title="Data" placeholder="Enter date" />);

    const inputElement = screen.getByPlaceholderText('Enter date');
    fireEvent.change(inputElement, { target: { value: '01012024' } });
    expect(inputElement).toHaveValue('01/01/2024');
  });

  test('removes red border on click', () => {
    render(<Input title="Nome" placeholder="Enter name" />);

    const inputElement = screen.getByPlaceholderText('Enter name');
    inputElement.style.border = 'red 1px solid';
    fireEvent.click(inputElement);
    expect(inputElement).toHaveStyle('border: rgb(211, 211, 211) 1px solid');
  });
});