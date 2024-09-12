import Reminder from './Reminder';
import './Style/Day.css'


interface DayProps {
    date: string;
}


const Day: React.FC<DayProps> = ({ date }) => {

  return (
    <div className='day-container'>
        <h2>{date}</h2>
          <Reminder />
          <Reminder />
          <Reminder />
    </div>

  )
}

export default Day