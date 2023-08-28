import React from 'react'

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

export default Item