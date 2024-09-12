import { useEffect, useState } from "react";
import Day from "./Day";
import './Style/List.css'
import { AxiosResponse } from 'axios';
import { api } from "../Services/api";


interface Dates {
  date: string;
}

const List = () => {

    const [dates, setDates] = useState<string[]>([]);

    useEffect(() => {
      const fetchDates = async () => {
        try {
            const response: AxiosResponse<Dates[]> = await api.get('/reminders/dates');
            
            const datesArray = response.data.map((item: Dates) => item.date);
            setDates(datesArray);
        } catch (error) {
            console.error('Erro ao buscar as datas:', error);
        }
    };

    fetchDates();
    }, []);


  return (
    <div className="list-container">
      {dates.map((date) => (
        <Day date={date} />
      ))}
    </div>
  );
};

export default List