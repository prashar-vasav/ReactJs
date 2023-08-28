import React from 'react'

function Stats(props) {
    const numItems = props.items.length;
    const numPacked = props.items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);
    return (
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You Got Everything ready to go"
            : `You have ${numItems} items in your list and you already packed ${numPacked} (${
                isNaN(percentage) ? 0 : percentage
              }%)`}
        </em>
      </footer>
    );
  }
  

export default Stats