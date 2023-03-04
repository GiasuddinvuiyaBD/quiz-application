import AnswerCard from './AnswerCard'; 
import  {useState} from 'react';
const QuestionCard = (
    {
        quize,
        currentAnswer,
        querentQuestionIndex,
        quizzes,
        navigateNext,
        pickAnswer,
        correctAnswer,
        pickedAnswer
        
    }) => 
{
    return(
        <div className="question-card">
            <p>
                Question : {querentQuestionIndex + 1} / {quizzes.length}
            </p>
            <h3>{quize.question}</h3>
            {currentAnswer.map((answer,i) => 
            {
              return <AnswerCard 
                key={i}  
                answer={answer} 
                pickAnswer={pickAnswer}
                correctAnswer={correctAnswer}
                pickedAnswer={pickedAnswer}
               />
            })}
            <button onClick={navigateNext}>Next</button>
        </div>
    )
}

export default QuestionCard;