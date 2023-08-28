import { useState } from "react";
import Stats from "./Components/Stats";
import PackingList from "./Components/PackingList";
import Form from "./Components/Form";
import Logo from "./Components/Logo";

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
  function clearHandler() {
    const confirmed = window.confirm("Are You Sure");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItemsHandler} />
      <PackingList
        items={items}
        onDeleteItems={deleteItemsHandler}
        onToggleItems={toggleItemsHandler}
        onClearItems={clearHandler}
      />
      <Stats items={items} />
    </div>
  );
}









