import ListGroup from "../../components/ListGroup";

import { Card, Item } from "../../types";

interface Props {
  todoList: Card;
  onChangeListOrder: (list: Card) => void;
  onAddItem: (text: string) => void;
  onDeleteItem: (id: string) => void;
  onChangeItem: (item: Item) => void;
}

const TodoCard = ({
  todoList,
  onChangeItem,
  onDeleteItem,
  onChangeListOrder,
  onAddItem,
}: Props) => {
  return (
    <div key={todoList.card_id} flex="~ col 1" className="overflow-hidden">
      <header
        flex="~ row items-center"
        className="hover:bg-tint-2:50 cursor-pointer p-1 mx-4 rounded-1 mb-2"
      >
        <input
          type="text"
          className="w-full font-Poppins outline-none font-700 text-secondary/100 border-none text-7"
          name="headingInput"
          bg-transparent
          appearance-none
          value={todoList.title}
          onChange={(e) =>
            onChangeListOrder({ ...todoList, title: e.target.value })
          }
        />
      </header>

      <ListGroup
        onChangeListOrder={(list) => {
          onChangeListOrder({ ...todoList, list });
        }}
        onAddItem={(text) => onAddItem(text)}
        onChangeItem={(todoItem) => onChangeItem(todoItem)}
        onDeleteItem={(todoItem) => onDeleteItem(todoItem.id)}
        list={todoList.list}
      />
    </div>
  );
};

export default TodoCard;
