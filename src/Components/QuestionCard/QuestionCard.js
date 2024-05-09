import './QuestionCard.css';

const QuestionCard = ({ index, questions, loading, answersPool, handleAnswerSelection }) => {
    return (
        <div className="question-card-container d-flex position-relative">
            {index === questions.length ? (
                null
            ) : (
                <div className="question-card">                    
                    <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <div>
                                    {questions.length > 0 ? (
                                        <div>
                                            <div className='question mt-5'>{questions[index].question}</div>
                                            {/* TODO: this part should set a timer for 30 seconds */}
                                            <div className="timer mt-2">
                                                <div className="progress">
                                                    <div className="progress-bar progress-bar-striped bg-info w-50" role="progressbar"></div>
                                                </div>
                                            </div>
                                            <div className="answers-container d-flex flex-column justify-content-center align-content-center pt-3 pb-3">
                                                {answersPool.length > 0 && questions[index] && answersPool.map((answer, answerIndex) => (
                                                    <div key={answerIndex} onClick={() => handleAnswerSelection(answer === questions[index].correct_answer)} className={`answer ${answer === questions[index].correct_answer ? 'correct-answer' : 'incorrect-answer'} d-flex flex-row justify-content-center align-content-center p-3`}>{answer}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No questions available</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className='question-tracker d-flex position-absolute bottom-0 mb-3'>
                <div className="question-tracker d-flex justify-content-center flex-wrap align-content-center">{`${index + 1} / ${questions.length}`}</div>
            </div>
        </div >
    );
};

export default QuestionCard;

