import './Style/Input.css'


interface InputProps {
    title: string;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ title, placeholder }) => {


  return (
    <div className="input-container">
        <div className="input-left">
            <h2>{title}</h2>
        </div>
        <input className="input-right" placeholder={placeholder}/>
    </div>
  )
}

export default Input