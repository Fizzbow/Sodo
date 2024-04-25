import ListGroup from "../../components/ListGroup";
import { TodoItem } from "../../components/ListGroup";

export interface TodoList {
  heading: string;
  id: string;
  list: Array<TodoItem>;
}

interface Props {
  todoList: TodoList[];
  changeTodo: (list: TodoList) => void;
}

const TodoCard = ({ todoList, changeTodo }: Props) => {
  function changeItem(todoItem: TodoItem, cardTodo: TodoList) {
    const newList = cardTodo.list.map((i) => {
      if (i.id === todoItem.id) {
        return todoItem;
      }
      return i;
    });
    changeTodo({
      ...cardTodo,
      list: newList,
    });
  }

  function deleteItem(todoItem: TodoItem, cardTodo: TodoList) {
    const newList = cardTodo.list.filter((i) => i.id !== todoItem.id);
    changeTodo({
      ...cardTodo,
      list: newList,
    });
  }

  return (
    <>
      {todoList.map((item) => {
        return (
          <div key={item.id} flex="~ col">
            <header
              flex="~ row items-center"
              className="hover:bg-tint-2:50 cursor-pointer py-3 px-2 rounded-1 mb-4"
            >
              <input
                type="text"
                className="w-full font-Poppins outline-none font-700 text-word border-none text-7"
                name="headingInput"
                bg-transparent
                appearance-none
                value={item.heading}
                onChange={(e) =>
                  changeTodo({ ...item, heading: e.target.value })
                }
              />
            </header>

            <ListGroup
              onChangeList={(list) => {
                changeTodo({ ...item, list });
              }}
              onAddItem={(i) => {
                const { list } = item;
                list.push(i);
                changeTodo({ ...item, list });
              }}
              onChangeItem={(todoItem) => changeItem(todoItem, item)}
              onDeleteItem={(todoItem) => deleteItem(todoItem, item)}
              list={item.list}
            />
          </div>
        );
      })}
    </>
  );
};

export default TodoCard;
