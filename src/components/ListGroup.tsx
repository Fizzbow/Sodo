function ListGroup() {
  const list = ["an item", "items", "new york", "Canada"];
  //   list = [];
  //   const message = list.length === 0 ? <p>NO item found</p> : null;
  const message = list.length === 0 && <p>NOt item found</p>;
  return (
    <>
      <h1>list</h1>
      {message}
      <ul className="list-group">
        {list.map((item) => (
          <li
            onClick={() => console.log({ item })}
            className="list-group-item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
