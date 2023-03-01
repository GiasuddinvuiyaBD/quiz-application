
const Suffle = (quize) =>
{
    const answer = [quize.correct_answer,...quize.incorrect_answers]
    for(let i = answer.length - 1; i > 0; i--)
    {
        // shuffling start here
       const j = Math.floor(Math.random() * (i + 1));
       [answer[i], answer[j]] = [answer[j], answer[i]]
    }
    return answer;
}
export default Suffle;