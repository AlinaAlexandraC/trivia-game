import InGameMenu from "../Components/InGameMenu/InGameMenu";
import QuestionCard from "../Components/QuestionCard/QuestionCard";
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../http/questions';
import { useNavigate } from 'react-router-dom';

const TriviaGame = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [answersPool, setAnswersPool] = useState([]);
    const [score, setScore] = useState(0);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [incorrectAnswersCounter, setIncorrectAnswersCounter] = useState(0);
    const navigate = useNavigate();

    const getQuestions = async () => {
        // TODO: when the page is refreshed, the game starts over
        try {
            const cachedQuestions = localStorage.getItem('cachedQuestions');
            if (cachedQuestions) {
                setQuestions(JSON.parse(cachedQuestions));
                setLoading(false);
            } else {
                const questionsData = await fetchQuestions();
                setQuestions(questionsData);
                const questionsInfo = questionsData.map((question, index) => ({
                    id: index + 1,
                    question: question.question,
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

            const timer = setTimeout(() => {
                handleAnswerSelection(false);
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [questions, index]);

    const handleAnswerSelection = (isCorrect) => {
        if (index === questions.length - 1) {
            navigate('/stats');
        } else {
            setIndex(index + 1);

            if (isCorrect) {
                setScore(score + 1);
                setCorrectAnswersCounter(correctAnswersCounter + 1);
            } else {
                setIncorrectAnswersCounter(incorrectAnswersCounter + 1);
            }
        }
    };

    const restartGame = () => {
        localStorage.removeItem('cachedQuestions');
        setLoading(true);
        getQuestions();
        setScore(0);
    };

    return (
        <div className="trivia-game">
            <InGameMenu restartGame={restartGame} score={score} />
            <QuestionCard index={index} questions={questions} loading={loading} answersPool={answersPool} handleAnswerSelection={handleAnswerSelection} />
        </div>
    );
}
 
export default TriviaGame;