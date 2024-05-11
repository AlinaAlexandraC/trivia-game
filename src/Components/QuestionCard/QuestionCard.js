import { WidthFull } from '@mui/icons-material';
import InGameMenu from '../InGameMenu/InGameMenu';
import './QuestionCard.css';

const QuestionCard = ({ index, questions, answersPool, handleAnswerSelection, score, restartGame, seconds, timerSeconds }) => {
    const divStyle = {
        width: 600,
    };
    
    return (
        <div className="question-card-container d-flex position-relative">
            <InGameMenu score={score} restartGame={restartGame} />
            <div>
                <div className='question mt-5'>{questions[index].question}</div>
                {/* TODO: this part should set a timer for 30 seconds */}
                <div className="timer mt-2">
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-info" style={divStyle} role="progressbar"></div>
                    </div>
                </div>
                <div className="answers-container d-flex flex-column justify-content-center align-content-center pt-3 pb-3">
                    {answersPool.length > 0 && questions[index] && answersPool.map((answer, answerIndex) => (
                        <div key={answerIndex} onClick={() => handleAnswerSelection(answer === questions[index].correct_answer)} className={`answer ${answer === questions[index].correct_answer ? 'correct-answer' : 'incorrect-answer'} d-flex flex-row justify-content-center align-content-center p-3`}>{answer}</div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default QuestionCard;

