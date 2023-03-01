import AnswerCard from './AnswerCard'; 
import  {useState} from 'react';
const QuestionCard = ({quize,currentAnswer}) => 
{

    return(
        <div className="question-card">
            <h3>{quize.question}</h3>
            
        {currentAnswer.map((answer,i) => 
        {
           return <AnswerCard key={i}  answer={answer} />
        })}
           
        </div>
    )
}

export default QuestionCard;