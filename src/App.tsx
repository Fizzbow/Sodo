import "./App.css";
import ListGroup from "../src/components/ListGroup";

function App() {
  const list = ["an item", "items", "new york", "Canada"];
  return (
    <>
      <div>
        <ListGroup list={list} heading="Cities" />
      </div>
    </>
  );
}

export default App;
