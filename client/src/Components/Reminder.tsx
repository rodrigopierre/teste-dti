import { api } from '../Services/api';
import './Style/Reminder.css'


interface ReminderProps {
  title: string;
  id: number;
}


const Reminder: React.FC<ReminderProps> = ({ title, id }) => {

  function deleteClick() {
    api.delete(`/reminders/${id}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }


  return (
    <div className='reminder-container'>
        <p>{title}</p>
        <button className="delete-btn" onClick={() => deleteClick()}>x</button>
    </div>
  )
}

export default Reminder