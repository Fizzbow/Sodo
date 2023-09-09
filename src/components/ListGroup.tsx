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
      <div>
        <h1>{heading}</h1>
        {message}
        <ul>
          {list.map((item, index) => (
            <CheckItem {...item} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
}
export default ListGroup;
