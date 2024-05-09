import axios from 'axios';

const fetchQuestions = async () => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy`);

    return response.data.results;
};

export {
    fetchQuestions
};