import { useState } from 'react';
import { api } from '../Services/api';
import './Style/Reminder.css'


interface ReminderProps {
  title: string;
  id: number;
}


const Reminder: React.FC<ReminderProps> = ({ title, id }) => {

  const [modal, setModal] = useState(false);

  function deleteClick() {          // deleta o lembrete ao clicar no botão de excluir
    setModal(false);

    api.delete(`/reminders/${id}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    window.location.reload();
  }


  return (
    <div className='reminder-container'>
        <p>{title}</p>
        <span className="material-symbols-outlined" onClick={() => setModal(true)}>
          cancel
        </span>

        {modal &&                             // renderização condicional do modal de exclusão de um lembrete
        <div className='modal-background'>
          <div className='delete-modal'>
            <h1>Tem certeza que deseja excluir esse lembrete?</h1>
            <div className='modal-btns'>
              <button className='delete-btn' onClick={() => deleteClick()}>Excluir</button>
              <button className='return-btn' onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
        }

    </div>
  )
}

export default Reminder