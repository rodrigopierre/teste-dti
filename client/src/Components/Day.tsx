import Lembrete from './Lembrete';
import './Style/Day.css'


interface DayProps {
    date: string;
}


const Day: React.FC<DayProps> = ({ date }) => {

  return (
    <>
        <h2>{date}</h2>
        <Lembrete />
    </>

  )
}

export default Day