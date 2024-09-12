import { useState } from 'react';
import './Style/Input.css'


interface InputProps {
    title: string;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ title, placeholder }) => {

  const [date, setDate] = useState("");


  const formatDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d{4})$/, "$1/$2");
};

  function borderReturn(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    input.style.border = 'rgb(211, 211, 211) 1px solid';
  }

  return (
    <div className="input-container" >
        <div className="input-left">
            <h2>{title}</h2>
        </div>

        {title == 'Data' && 
        <input 
        className="input-right" 
        placeholder={placeholder}
        minLength={10}
        maxLength={10}
        onChange={(e) => {
          setDate(formatDate(e.target.value));
          borderReturn(title);
        }}
        value={formatDate(date)}
        id={title}
        onClick={() => borderReturn(title)}
        /> }

        {title == 'Nome' && 
        <input 
        className="input-right" 
        placeholder={placeholder}
        maxLength={50}
        id={title}
        onChange={() => borderReturn(title)}
        onClick={() => borderReturn(title)}
        /> }

    </div>
  )
}

export default Input