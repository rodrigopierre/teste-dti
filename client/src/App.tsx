import { useState } from 'react'
import './App.css'
import Input from './Components/Input'
import List from './Components/List'
import { api } from './Services/api';

function App() {      // Tela única do projeto

  const [error, setError] = useState("");

  function validateInput() {       // Valida os campos de criação de lembrete
    const dateInput = document.getElementById("Data") as HTMLInputElement;
    const date = dateInput.value;
    const nameInput = document.getElementById("Nome") as HTMLInputElement;
    const name = nameInput.value;

    if (name == '' || date == '') {
      setError("Você deve preencher todos os campos!");
      if (date == '') {
        dateInput.style.border = 'red 2px solid';
      }
      if (name == '') {
        nameInput.style.border = 'red 2px solid';
      }
      return
    }

    if (validateDate(date) != '') {
      setError(validateDate(date));
      dateInput.style.border = 'red 2px solid';
      return
    }

    setError("");

    api.post('/reminders', {               // Comunica a criação do lembrete com o servidor
      date,
      name
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    window.location.reload();
  }


  function validateDate(date: string) {       // Testa se a data é válida
    const [day, month, year] = date.split("/").map(Number);
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);
  
    if (inputDate < currentDate) {
      return "A data deve estar no futuro";
    }

    if (month < 1 || month > 12) {
      return "O mês deve ser válido";
    }

    if (day < 1 || day > 31) {
      return "O dia deve ser válido";
    }

    if (month === 2 && day > 29) {
      return "Fevereiro tem no máximo 29 dias";
    }

    if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 30
    ) {
      return "O mês selecionado tem no máximo 30 dias";
    }
    
    return "";
  };


  return (
    <div className='app-screen'>

      <div className='top-screen'>
        <h1>Novo Lembrete</h1>
        <Input title="Nome" placeholder="Nome do lembrete" />
        <Input title="Data" placeholder="Data do lembrete (no formato dd/mm/yyyy)" />
        <p className='error'>{error}</p>
        <div className='btn-container'>
          <button className='send-btn' onClick={() => validateInput()}>Criar</button>
        </div>
      </div>

      <div className='bottom-screen'>
        <h1>Lista de lembretes</h1>
        <List />
      </div>
    </div>
  )
}

export default App
