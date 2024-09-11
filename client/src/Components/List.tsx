import Day from "./Day";



interface ListProps {
    dates: string[];
}


const List: React.FC<ListProps> = ({ dates }) => {
    return (
      <>
        {dates.map((date) => (
          <Day key={date} date={date} />
        ))}
      </>
    );
  };

export default List