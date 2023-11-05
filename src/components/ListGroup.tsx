import { useState } from "react";

interface Props {
  clubs: string[];
  heading: string;
  OnSelectItem: (item: string) => void;
}

function ListGroup({ clubs, heading, OnSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {clubs.length === 0 && <p>No clubs found</p>}
      <ul className="list-group">
        {clubs.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              OnSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
