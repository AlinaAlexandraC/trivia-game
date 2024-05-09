import './Statistics.css';
import { Link } from 'react-router-dom';

const Statistics = () => {
    const feedbacks = [
        "Oops! Looks like you didn't quite make it this time. Keep practicing and try again to reach that winning score!", // (for scores below 49)
        "Great job! You're on the right track. With a bit more effort and focus, you'll be soaring towards victory in no time!", // (for scores between 50 and 79)
        "Congratulations! You nailed it! Your score is over 80, which means you're a true quiz master! Keep up the great work!" // (for scores over 80)
    ]

    return (
        <div className="stats-container">
            <div className="stats mt-5">
                <div className="stats-title p-3">
                    Game Summary
                </div>
                {/* TODO: this part should show what the player selected in the main menu form */}
                <p className="game-stats p-3">Number of questions; Category; Difficulty</p>
                {/* TODO: this part should show different feedbacks for score below 49, between 50 and 79 or above 80 */}
                <p className="feedback">Feedback</p>
                <div className="stats">
                    {/* TODO: this part should calculate the score - (100 / number of questions) * number of correct questions */}
                    <p className="pass-rate">Your Score is: 70%</p>
                    {/* TODO: each type of answer should have a counter */}
                    <p className="correct-answers">Correct Answers: 7</p>
                    <p className="incorrect-answers">Incorrect Answers: 3</p>
                    <p className="unanswered">Unanswered: 0</p>
                </div>
            </div>
            <div className="buttons d-flex flex-row p-3">
                <Link to='/question' className='hero-btn text-decoration-none m-3'>
                    <div className="restart-game-stats hero-btn">Restart Game</div>
                </Link>
                <Link to='/' className='hero-btn text-decoration-none m-3'>
                    <div className="main-menu-stats hero-btn">Main Menu</div>
                </Link>
            </div>
        </div>
    );
};

export default Statistics;