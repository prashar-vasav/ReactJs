import React from "react";

export default function StartScreen({numQuestions,dispatch}) {
  return (
    <div>
      <h2>Welcome To React Quiz</h2>
      <h3>{numQuestions} Questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's Start</button>
    </div>
  );
}
