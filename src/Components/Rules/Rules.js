import { keyboard } from '@testing-library/user-event/dist/keyboard';
import './Rules.css';
import React, { useState } from 'react';
import Collapse from 'react-collapse';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
    const navigate = useNavigate();
    const [categoryStates, setCategoryStates] = useState({
        category1: false,
        category2: false,
        category3: false,
        category4: false,
        category5: false,
        category6: false
    });

    const toggleCategory = (category) => {
        setCategoryStates((prevState) => {
            const updatedState = {};
            Object.keys(prevState).forEach((key) => {
                updatedState[key] = key === category ? !prevState[key] : false;
            });
            return updatedState;
        });
    };

    const sectionTitles = ['Setting Up the Game', 'How to Play', 'Scoring', 'Checking Your Stats', 'The Winning Goal', 'Game End'];
    const sectionDescription = [
        "Get ready for fun! Choose how many questions you want to tackle, pick your favorite category, and set the difficulty level. It's time to customize your quiz adventure!",
        "Get your thinking cap on! Each question will pop up with options to choose from or a simple true/false. You've got 30 seconds to make your move.",
        "Every correct answer earns you a shiny point! But watch out, wrong answers or blanks won't earn you anything. Stay sharp!",
        "After the game, you'll get a breakdown of your performance. See how many questions you got right, how many slipped by, and any you didn't get to. It's all about improving for the next round!",
        "Can you reach the magic number of 80 points? That's your ticket to victory! Keep pushing to beat your own high score!",
        "The game ends when you've answered all your chosen questions. Ready to see how well you did? Let's find out!"
    ];

    return (
        <div className="rules-container position-relative">
            <div className="rules position-absolute top-0 mt-5">
                <h1 className='rules-title p-3'>Trivia Rules</h1>
                {sectionTitles.map((title, index) => (
                    <div key={index} onClick={() => toggleCategory(`category${index + 1}`)} className={`collapsible p-3 ${categoryStates[`category${index + 1}`] ? 'clicked' : ''}`}>
                        <h2 className='category-title'>{title}</h2>
                        <Collapse isOpened={categoryStates[`category${index + 1}`]}>
                            <div className='content'>{sectionDescription[index]}</div>
                        </Collapse>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate(-1)} className="hero-btn btn text-center position-absolute bottom-0 m-3">Back</button>
        </div >
    );
};

export default Rules;