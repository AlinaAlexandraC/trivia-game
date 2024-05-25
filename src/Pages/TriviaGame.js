import QuestionCard from "../Components/QuestionCard/QuestionCard";
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../http/questions';
import dinosaur from '../assets/dinosaur-dancing.gif';
import { useNavigate } from "react-router-dom";

const TriviaGame = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [answersPool, setAnswersPool] = useState([]);
    const [score, setScore] = useState(0);
    const [width, setWidth] = useState(700);
    const timerSeconds = 20000;
    const apiUrl = localStorage.getItem('apiUrl');

    function HTMLDecode(textString) {
        let doc = new DOMParser().parseFromString(textString, "text/html");
        return doc.documentElement.textContent;
    }

    const getQuestions = async () => {
        try {
            const cachedIndex = localStorage.getItem('quizIndex');
            const initialIndex = cachedIndex ? parseInt(cachedIndex) : 0;
            setIndex(initialIndex);

            const cachedQuestions = localStorage.getItem('cachedQuestions');

            if (cachedQuestions) {
                setQuestions(JSON.parse(cachedQuestions));
                setLoading(false);
            } else {
                const questionsData = await fetchQuestions(apiUrl);
                setQuestions(questionsData);
                const questionsInfo = questionsData.map((question, index) => ({
                    id: index + 1,
                    question: HTMLDecode(question.question),
                    correct_answer: question.correct_answer,
                    incorrect_answers: question.incorrect_answers
                }));

                setQuestions(questionsInfo);
                setLoading(false);
                localStorage.setItem('cachedQuestions', JSON.stringify(questionsInfo));
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[index];
            let answersPoolArray = [...currentQuestion.incorrect_answers];
            let correctAnswerPos = Math.floor(Math.random() * 4) + 1;
            answersPoolArray.splice(correctAnswerPos - 1, 0, currentQuestion.correct_answer);
            setAnswersPool(answersPoolArray);
            if (index < questions.length) {
                const interval = setInterval(() => {
                    setWidth(prevWidth => prevWidth - (700 / (timerSeconds / 50)));
                }, 50);

                const timer = setTimeout(() => {
                    handleAnswerSelection(false);
                }, timerSeconds);

                return () => {
                    clearTimeout(timer);
                    clearInterval(interval);
                    setWidth(700);
                };
            }
        }
    }, [questions, index]);

    const handleAnswerSelection = (isCorrect) => {
        if (index === questions.length - 1) {
            localStorage.setItem('score', score);
            navigate('/feedback');
        } else {
            setIndex(index + 1);

            if (isCorrect) {
                setScore(score + 1);
            }
        }
    };

    const restartGame = () => {
        localStorage.removeItem('cachedQuestions');
        localStorage.removeItem('quizIndex');
        setLoading(true);
        getQuestions();
        setIndex(0);
        setScore(0);
    };

    return (
        <div className="trivia-game">
            <div className="question-card">
                {loading ? (
                    <div className="loader-container d-flex justify-content-center m-5">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div >
                        <div>
                            {questions.length > 0 ? (
                                <div>
                                    <QuestionCard index={index} questions={questions} loading={loading} answersPool={answersPool} handleAnswerSelection={handleAnswerSelection} score={score} restartGame={restartGame} width={width} HTMLDecode={HTMLDecode} />
                                    <div className='question-tracker d-flex position-absolute bottom-0 mb-3'>
                                        <div className="question-tracker d-flex justify-content-center flex-wrap align-content-center">{`${index + 1} / ${questions.length}`}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-questions m-5 p-5 rounded">
                                    <img src={dinosaur} alt="dancing-dinosaur" className="rounded-circle" />
                                    <p className="first-paragraph pt-5">No questions available</p>
                                    <p className="second-paragraph">But here's a dancing dinosaur instead</p>
                                    <button onClick={() => navigate(-1)} className="hero-btn btn text-center">Back</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TriviaGame;