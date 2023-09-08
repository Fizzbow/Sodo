import ListGroup from "../src/components/ListGroup";
import { ItemProps } from "./components/CheckItem";

function App() {
  const list: Array<ItemProps> = [
    { text: "an item", caption: "captions" },
    { text: "items", caption: "captions" },
    { text: "new york", caption: "captions" },
  ];
  const selectItem = (item: string) => {
    console.log({ item });
  };
  return (
    <>
      <div mx-6 my-8>
        <ListGroup list={list} heading="😄Cities" onSelectItem={selectItem} />
      </div>
    </>
  );
}

export default App;
