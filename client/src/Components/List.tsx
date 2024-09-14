import { useEffect, useState } from "react";
import Day from "./Day";
import './Style/List.css'
import { AxiosResponse } from 'axios';
import { api } from "../Services/api";


interface Dates {
  date: string;
}

const List = () => {

  function sortDates(datesArray: string[]): string[] {      // Ordena as datas cronologicamente
    return datesArray.sort((a: string, b: string) => {
      const [diaA, mesA, anoA] = a.split('/');
      const [diaB, mesB, anoB] = b.split('/');
  
      const dataA = new Date(`${anoA}-${mesA}-${diaA}`);
      const dataB = new Date(`${anoB}-${mesB}-${diaB}`);
  
      return dataA.getTime() - dataB.getTime();
    });
  }

    const [dates, setDates] = useState<string[]>([]);

    useEffect(() => {
      const fetchDates = async () => {        // Busca as datas que possuem lembretes
        try {
            const response: AxiosResponse<Dates[]> = await api.get('/reminders/dates');
            
            const datesArray = response.data.map((item: Dates) => item.date);
            setDates(sortDates(datesArray));
        } catch (error) {
            console.error('Erro ao buscar as datas:', error);
        }
    };

    fetchDates();
    }, []);


  return (
    <div className="list-container">
      {dates.map((date) => (        // Renderiza todas as datas que possuem lembretes
        <Day date={date} />
      ))}
    </div>
  );
};

export default List