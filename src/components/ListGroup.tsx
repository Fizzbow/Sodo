import { useState } from "react";
import CheckItem from "./CheckItem";
import type { ItemProps } from "./CheckItem";

interface Props {
  list: Array<ItemProps>;
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ list, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const message = list.length === 0 && <p>NOt item found</p>;
  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {/* {list.map((item, index) => (
          <li
            onClick={() => {
              setSelectedIndex(index), onSelectItem(item);
            }}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
          >
            {item}
          </li>
        ))} */}
        {list.map((item, index) => (
          <CheckItem {...item} />
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
