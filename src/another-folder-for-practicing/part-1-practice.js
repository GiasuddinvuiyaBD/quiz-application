import { useState } from "react";
// for showing data to ui 
const [Quizzes,setQuizzes] = useState(null); 
const fetchQuize =  async () => 
{
  const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple');
  const {results} = await response.json(); 
  setQuizzes(results)
  console.log(results)
}

return (
  <div className="App">
    <button onClick={fetchQuize}>Start Quize</button>
  </div>
);