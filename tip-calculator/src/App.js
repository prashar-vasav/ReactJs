import React, { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [percent, setPercent] = useState(0);
  const [friendPercent, setFriendPercent] = useState(0);

  const avg = (percent + friendPercent) / 2 / 100;
  const tip = bill * avg;
  function resetHandler() {
    setBill("");
    setPercent(0);
    setFriendPercent(0);
  }
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <Percentage percent={percent} onSetPercent={setPercent}>
        How did you like the service?
      </Percentage>
      <Percentage percent={friendPercent} onSetPercent={setFriendPercent}>
        How did your friend like the service?
      </Percentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={resetHandler} />
        </>
      )}
    </div>
  );
}
function BillInput(props) {
  return (
    <div>
      <p>How much was the bill?</p>
      <input
        type="number"
        value={props.bill}
        onChange={(e) => props.onSetBill(+e.target.value)}
      />
    </div>
  );
}

function Percentage(props) {
  return (
    <div>
      <p>{props.children}</p>
      <select
        value={props.percent}
        onChange={(e) => props.onSetPercent(+e.target.value)}
      >
        <option value="0">0%</option>
        <option value="5">5%</option>
        <option value="10">10%</option>
        <option value="15">15%</option>
        <option value="20">20%</option>
      </select>
    </div>
  );
}

function Output(props) {
  return (
    <h3>
      You Pay ${props.bill + props.tip} (${props.bill} +${props.tip} Tip)
    </h3>
  );
}
function Reset(props) {
  return <button onClick={props.onReset}>Reset</button>;
}

export default App;
