import './Style/Day.css'


interface DayProps {
    date: string;
}


const Day: React.FC<DayProps> = ({ date }) => {

  return (
    <h2>{date}</h2>
  )
}

export default Day