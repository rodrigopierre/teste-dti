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


// function validateDate(date: string) {
//   const [day, month, year] = date.split("/").map(Number);
//   const currentDate = new Date();
//   const inputDate = new Date(year, month - 1, day);

//   if (inputDate > currentDate) {
//     return "A data não pode ser no futuro";
//   }

//   if(year < 1908){
//     return "Ano inválido"
//   }

//   if (month < 1 || month > 12) {
//     return "Mês inválido";
//   }

//   if (day < 1 || day > 31) {
//     return "Dia inválido";
//   }

//   if (month === 2 && day > 29) {
//     return "Fevereiro tem no máximo 29 dias";
//   }

//   if (
//     (month === 4 || month === 6 || month === 9 || month === 11) &&
//     day > 30
//   ) {
//     return "O mês selecionado tem no máximo 30 dias";
//   }

//   return "";
// };


  return (
    <div className="input-container">
        <div className="input-left">
            <h2>{title}</h2>
        </div>

        {title == 'Data' && 
        <input 
        className="input-right" 
        placeholder={placeholder}
        minLength={10}
        maxLength={10}
        onChange={(e) => setDate(formatDate(e.target.value))}
        value={formatDate(date)}
        /> }

        {title == 'Nome' && 
        <input 
        className="input-right" 
        placeholder={placeholder}
        maxLength={50}
        /> }

        <h1>{date}</h1>
    </div>
  )
}

export default Input