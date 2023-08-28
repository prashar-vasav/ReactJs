import React, { useState } from 'react'

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

export default Form