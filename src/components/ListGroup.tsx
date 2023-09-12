export interface ItemProps {
  text: string;
  caption: string;
  checked?: boolean;
  id: number;
}

interface Props {
  list: Array<ItemProps>;
  onSelectItem: (item: string) => void;
}

function ListGroup({ list }: Props) {
  // const [selectedIndex, setSelectedIndex] = useState(-1);

  // const message = list.length === 0 && <p>NOt item found</p>;
  return (
    <>
      <div>
        <ul>
          {list.map((item, index) => (
            <CheckItem {...item} key={item.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

const CheckItem = ({ text, caption, checked = false }: ItemProps) => {
  return (
    <li my-1 p-4 bg-tint-1 rounded-1 flex="~ row items-center">
      <label
        flex="~ row items-center gap-4"
        className="hover:bg-tint-2:30"
        w-full
        rounded-1
        p-2
        cursor-pointer
        duration-300
        checked:text-gray-300
      >
        <input
          type="checkbox"
          vertical-middle
          outline-none
          border-2
          border-solid
          appearance-none
          border-tint-2
          rounded-full
          w-8
          h-8
        />
        <div flex="~ col">
          <span text-16px className="text-tint-3">
            {text}
          </span>
          {caption && <span text-tint-2>{caption}</span>}
        </div>
      </label>
    </li>
  );
};

export default ListGroup;
