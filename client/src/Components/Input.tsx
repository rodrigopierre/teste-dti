import './Input.css'


interface InputProps {
    title: string;
    placeholder: string;
  }

const Input: React.FC<InputProps> = ({ title, placeholder }) => {


  return (
    <div className="Input-container">
        <div className="Input-left">
            <h2>{title}</h2>
        </div>
        <input className="Input-right" placeholder={placeholder}/>
    </div>
  )
}

export default Input