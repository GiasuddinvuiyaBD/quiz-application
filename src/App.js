import  {useState} from 'react';
import QuestionCard from './QuestionCard';
import Suffle from './uitilize'

function App() {
  // getting and seeting api request
  const [quizzes,setQuizzes] = useState(null);
  const [loaded,setLoaded] = useState(false)
  const [startQuize,setStartQuize] = useState(false)
  const [currentAnswer,setCurrentAnswerrs] = useState(null)
  const [endGame,setEndGame] = useState(false)
  const [querentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const navigateNext = () => 
  {
    const currentQuizeIndex = querentQuestionIndex + 1; 
    const validQuestionIndex = currentQuizeIndex < quizzes.length;

    if(validQuestionIndex)
    {
      setCurrentQuestionIndex(currentQuizeIndex);
      const question = quizzes[currentQuizeIndex];
      setCurrentAnswerrs(Suffle(question)); 
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
      // when i will get result those time i will return startQuize
      setStartQuize(true);
  } 

  return (
    <>
      <div className='App'>
        {endGame && <p>Its time to show result</p>}
          {/* when our start quize will be stop those time we will return stop button */}
          {!startQuize && <button onClick={fetchFun}>Start Quize</button>}
          
          <div className='container'>
            {/* It means when our loaded will be true those time it will work */}
            {loaded && !endGame && (<QuestionCard 
            quize={quizzes[querentQuestionIndex]} 
            currentAnswer={currentAnswer}
            querentQuestionIndex={querentQuestionIndex}
            quizzes={quizzes}
            navigateNext={navigateNext}
            />)}

          </div>
      </div>
    </>
  )
  
}

export default App;
