import './GameFeedback.css';
import { useNavigate } from "react-router-dom";

const GameFeedback = () => {
    const navigate = useNavigate();
    const amount = localStorage.getItem('amount');
    const category = localStorage.getItem('category');
    const difficulty = localStorage.getItem('difficulty');
    const score = localStorage.getItem('score');
    const passRate = ((100 / amount) * score).toFixed(2);
    const feedbacks = [
        "Keep practicing and try again to reach that winning score!", // (for scores below 49)
        "You're on the right track. With a bit more effort and focus, you'll be soaring towards victory in no time!", // (for scores between 50 and 79)
        "You nailed it! Your score is over 80, which means you're a true quiz master! Keep up the great work!" // (for scores over 80)
    ];

    return (
        <div className="game-feedback-container position-relative">
            <div className="feedback-table">
                <div className="feedback-title p-3">Game Feedback</div>
                <div className="game-selected d-flex flex-row justify-content-around p-3">
                    <div className="questions-number d-flex flex-column">
                        <label htmlFor="amount">Questions</label>
                        <span>{amount}</span>
                    </div>
                    {
                        (category === '')
                            ? <div className="category d-flex flex-column">
                                <label htmlFor="category">Category</label>
                                <span>Random</span>
                            </div>
                            : <div className="category d-flex flex-column">
                                <label htmlFor="category">Category</label>
                                <span>{category}</span>
                            </div>
                    }
                    {
                        (difficulty === '')
                            ? <div className="difficulty d-flex flex-column">
                                <label htmlFor="difficulty">Difficulty</label>
                                <span>Random</span>
                            </div>
                            : <div className="difficulty d-flex flex-column">
                                <label htmlFor="difficulty">Difficulty</label>
                                <span>{difficulty}</span>
                            </div>
                    }
                </div>
                <hr />
                {
                    (passRate < 50) && (
                        <div className="fail p-3">
                            <div>Oh no! That's a fail</div>
                            <div className="feedback p-3">{feedbacks[0]}</div>
                        </div>
                    )
                }
                {
                    (passRate > 49 && passRate < 80) && (
                        <div className="close-win p-3">
                            <div>Almost there, but not there yet</div>
                            <div className="feedback p-3">{feedbacks[1]}</div>
                        </div>
                    )
                }
                {
                    (passRate > 80) && (
                        <div className="win p-3">
                            <div>Smooth Win</div>
                            <div className="feedback p-3">{feedbacks[2]}</div>
                        </div>
                    )
                }
                <hr />
                <div className="results d-flex flex-row justify-content-around p-3">
                    <div className="score-feedback d-flex flex-column">
                        <label htmlFor="score-feedback">Score</label>
                        <span>{score}</span>
                    </div>
                    <div className="pass-rate d-flex flex-column">
                        <label htmlFor="pass-rate">Pass Rate</label>
                        <span>{passRate} %</span>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/')} className="hero-btn btn text-center position-absolute bottom-0 m-3">Main Menu</button>
        </div>
    );
};

export default GameFeedback;