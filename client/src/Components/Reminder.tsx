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

    window.location.reload();
  }


  return (
    <div className='reminder-container'>
        <p>{title}</p>
        <span className="material-symbols-outlined" onClick={() => deleteClick()}>
          cancel
        </span>
    </div>
  )
}

export default Reminder