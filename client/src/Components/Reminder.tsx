import './Style/Reminder.css'


interface ReminderProps {
  title: string;
  id: number;
}


const Reminder: React.FC<ReminderProps> = ({ title, id }) => {
  return (
    <div className='reminder-container'>
        <p>{title}</p>
        <button className="delete-btn">x</button>
    </div>
  )
}

export default Reminder