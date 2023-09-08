import "./App.css";
import ListGroup from "../src/components/ListGroup";

function App() {
  const list = ["an item", "items", "new york", "Canada"];
  const selectItem = (item: string) => {
    console.log({ item });
  };
  return (
    <>
      <div>
        <ListGroup list={list} heading="Cities" onSelectItem={selectItem} />
      </div>
    </>
  );
}

export default App;
