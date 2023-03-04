import  {useState} from 'react';
import QuestionCard from './QuestionCard';
import Suffle from './uitilize';
import ScoreCard from './ScoreCard';
import './index.css';


function App() {
  // getting and seeting api request
  const [quizzes,setQuizzes] = useState(null);
  const [loaded,setLoaded] = useState(false)
  const [startQuize,setStartQuize] = useState(false)
  const [currentAnswer,setCurrentAnswerrs] = useState(null)
  const [endGame,setEndGame] = useState(false)
  const [querentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore,setTotalScore] = useState(0); 
  const [correctAnswer,setCorrectAnswer] = useState(null);
  const [pickedAnswer,setPickedAnswer] = useState(null);

  // reset quize function start here 
  const resetQuiz = () => 
  {
    setQuizzes(null);
    setLoaded(false);
    setStartQuize(false);
    setCurrentAnswerrs(false);
    setEndGame(false);
    setTotalScore(0);
    setCorrectAnswer(null);
    setPickedAnswer(null);
    setCurrentQuestionIndex(0)
  }
  // picking answer function
  function pickAnswer(answer)
  {
    // right now i am working for pickedAnswer
    setPickedAnswer(answer)
    if(answer === correctAnswer)
    {
      setTotalScore((prevScore) => prevScore + 1)
    }
  }

  const navigateNext = () => 
  {
    const currentQuizeIndex = querentQuestionIndex + 1; 
    const validQuestionIndex = currentQuizeIndex < quizzes.length;

    if(validQuestionIndex)
    {
      setCurrentQuestionIndex(currentQuizeIndex);
      const question = quizzes[currentQuizeIndex];
      setCurrentAnswerrs(Suffle(question)); 
      // setting corrent answer on question navigation
      setCorrectAnswer(question.correct_answer)
      // reset pickedAnswer
      setPickedAnswer(null);
    }else{
      setEndGame(true)
    }
  }

  const fetchFun = async () => 
  {
    const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
    const {results} = await response.json();
      setQuizzes(results)
      // Getting all result
      let initialQuestionIndex = results[querentQuestionIndex];
      /*
      const answers = [initialQuestionIndex.correct_answer, ...initialQuestionIndex.incorrect_answers] 
      setCurrentAnswerrs(answers)
     */ 
      setCurrentAnswerrs(Suffle(initialQuestionIndex)); 
      setLoaded(true)
      // setting passing correct answer
      setCorrectAnswer(initialQuestionIndex.correct_answer)
      // when i will get result those time i will return startQuize
      setStartQuize(true);
  };

  return (
    <>
      <div className='App'>
        {endGame && <ScoreCard totalScore={totalScore} resetQuiz={resetQuiz} />}
          {/* when our start quize will be stop those time we will return stop button */}
          {!startQuize && <button onClick={fetchFun} style={{display: 'block',margin: '200px auto'}}>Start Quize</button>}
          <div className='container'>
            {/* It means when our loaded will be true those time it will work */}
            {loaded && !endGame && (<QuestionCard 
            pickAnswer={pickAnswer}
            quize={quizzes[querentQuestionIndex]} 
            currentAnswer={currentAnswer}
            querentQuestionIndex={querentQuestionIndex}
            quizzes={quizzes}
            correctAnswer={correctAnswer}
            pickedAnswer={pickedAnswer}
            navigateNext={navigateNext}
            />)};
          </div>
      </div>
    </>
  )
  
}

export default App;
