import './App.css'
import Input from './Components/Input'
import List from './Components/List'
import { listDays } from './Data/dates'

function App() {

  return (
    <div className='app-screen'>

      <div className='top-screen'>
        <h1>Novo Lembrete</h1>
        <Input title="Nome" placeholder="Nome do lembrete" />
        <Input title="Data" placeholder="Data do lembrete (no formato dd/mm/yyyy)" />
        <div className='btn-container'>
          <button className='send-btn'>Criar</button>
        </div>
      </div>

      <div className='bottom-screen'>
        <List dates={listDays}/>
      </div>
    </div>
  )
}

export default App
