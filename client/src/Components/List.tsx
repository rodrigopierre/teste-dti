import Day from "./Day";
import './Style/List.css'


interface ListProps {
    dates: string[];
}


const List: React.FC<ListProps> = ({ dates }) => {
    return (
      <div className="list-container">
        {dates.map((date) => (
          <Day key={date} date={date} />
        ))}
      </div>
    );
  };

export default List