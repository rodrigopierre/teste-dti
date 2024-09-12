import Lembrete from './Lembrete';
import './Style/Day.css'


interface DayProps {
    date: string;
}


const Day: React.FC<DayProps> = ({ date }) => {

  return (
    <div className='day-container'>
        <h2>{date}</h2>
          <Lembrete />
          <Lembrete />
          <Lembrete />
    </div>

  )
}

export default Day