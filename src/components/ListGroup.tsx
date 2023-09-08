import { MouseEvent, useState } from "react";

interface Props {
  list: string[];
  heading: string;
}

function ListGroup(props: Props) {
  //   const list = ["an item", "items", "new york", "Canada"];
  // arr[0] -> variable (selectedIndex)
  // arr[1] -> updater function
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //   list = [];
  //   const message = list.length === 0 ? <p>NO item found</p> : null;
  const message = props.list.length === 0 && <p>NOt item found</p>;
  return (
    <>
      <h1>{props.heading}</h1>
      {message}
      <ul className="list-group">
        {props.list.map((item, index) => (
          <li
            onClick={() => setSelectedIndex(index)}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
