import "./App.css";
import Alert from "../src/components/Alert";
import ListGroup from "../src/components/ListGroup";

function App() {
  const list = ["an item", "items", "new york", "Canada"];
  const selectItem = (item: string) => {
    console.log({ item });
  };
  return (
    <>
      <div>
        {
          /* <ListGroup list={list} heading="Cities" onSelectItem={selectItem} /> */
          <Alert>
            alert something <strong className="red">sdas</strong>
          </Alert>
        }
      </div>
    </>
  );
}

export default App;
