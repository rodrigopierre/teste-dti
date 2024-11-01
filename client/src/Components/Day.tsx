import { useEffect, useState } from 'react';
import Reminder from './Reminder';
import './Style/Day.css'
import { api } from '../Services/api';


interface DayProps {
    date: string;
}

interface Reminder {
  date: string;
  id: number;
  name: string;
}


const Day: React.FC<DayProps> = ({ date }) => {

  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const fetchRemindersByDate = async () => {        // Busca os lembretes referente a uma data específica
      try {
          const response = await api.post<Reminder[]>('/reminders/date', { date });
          setReminders(response.data);
      } catch (error) {
          console.error('Erro ao buscar lembretes:', error);
      }
    };

    fetchRemindersByDate();
  }, []);

  return (
    <div className='day-container'>
        <h2>{date}</h2>
        {reminders.map((reminder) => (                        // renderiza todos os lembretes dessa data
          <Reminder title={reminder.name} id={reminder.id} />
        ))}
    </div>

  )
}

export default Day