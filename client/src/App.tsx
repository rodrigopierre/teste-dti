import './App.css'
import Input from './Components/Input'

function App() {

  return (
    <div className='app-screen'>
      <div className='top-screen'>
        <Input title="Nome" placeholder="Nome do lembrete" />
        <Input title="Data" placeholder="Data do lembrete (no formato dd/mm/yyyy)" />
      </div>
      <div className='bottom-screen'>

      </div>
    </div>
  )
}

export default App
