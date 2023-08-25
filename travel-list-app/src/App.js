import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Pants", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function addItemsHandler(item) {
    setItems((items) => [...items, item]);
    console.log(items);
  }
  function deleteItemsHandler(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function toggleItemsHandler(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItemsHandler} />
      <PackingList
        items={items}
        onDeleteItems={deleteItemsHandler}
        onToggleItems={toggleItemsHandler}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>✈Far Away</h1>;
}

function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function submitHanler(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { quantity, description, packed: false, id: Date.now() };
    console.log(newItem);
    props.onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={submitHanler}>
      <h3> What do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Your Item Here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList(props) {
  return (
    <div className="list">
      <ul>
        {props.items.map((item) => (
          <Item
            item={item}
            onDeleteItems={props.onDeleteItems}
            onToggleItems={props.onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item(props) {
  return (
    <li>
      <input
        type="checkbox"
        value={props.item.packed}
        onChange={() => props.onToggleItems(props.item.id)}
      />
      <span style={props.item.packed ? { textDecoration: "line-through" } : {}}>
        {props.item.quantity} {props.item.description}
      </span>
      <button
        onClick={() => props.onDeleteItems(props.item.id)}
        style={{ color: "red" }}
      >
        &times;
      </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You have x items in your list and you already packed (x%)
    </footer>
  );
}
