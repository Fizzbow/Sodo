import ListGroup from "../../components/ListGroup";
import { TodoItem } from "../../components/ListGroup";
import { Card } from "../../types";

interface Props {
  todoList: Card;
  changeTodo: (list: Card) => void;
}

const TodoCard = ({ todoList, changeTodo }: Props) => {
  function changeItem(todoItem: TodoItem, cardTodo: Card) {
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

  function deleteItem(todoItem: TodoItem, cardTodo: Card) {
    const newList = cardTodo.list.filter((i) => i.id !== todoItem.id);
    changeTodo({
      ...cardTodo,
      list: newList,
    });
  }

  return (
    <>
      <div key={todoList.card_id} flex="~ col">
        <header
          flex="~ row items-center"
          className="hover:bg-tint-2:50 cursor-pointer py-3 px-2 rounded-1 mb-4"
        >
          <input
            type="text"
            className="w-full font-Poppins outline-none font-700 text-secondary/100 border-none text-7"
            name="headingInput"
            bg-transparent
            appearance-none
            value={todoList.title}
            onChange={(e) => changeTodo({ ...todoList, title: e.target.value })}
          />
        </header>

        <ListGroup
          onChangeList={(list) => {
            changeTodo({ ...todoList, list });
          }}
          onAddItem={(i) => {
            const { list } = todoList;
            list.push(i);
            changeTodo({ ...todoList, list });
          }}
          onChangeItem={(todoItem) => changeItem(todoItem, todoList)}
          onDeleteItem={(todoItem) => deleteItem(todoItem, todoList)}
          list={todoList.list}
        />
      </div>
    </>
  );
};

export default TodoCard;
