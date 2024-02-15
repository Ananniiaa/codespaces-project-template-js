import React, { useState } from 'react';

const LanguageLearningApp = () => {
  // State variables
  const [questionIndex, setQuestionIndex] = useState(0); // Index of current question
  const [score, setScore] = useState(0); // User's score
  const [answeredAllCorrectly, setAnsweredAllCorrectly] = useState(false); // Flag to track if all questions are answered correctly
  const [stars, setStars] = useState(10); // Number of stars earned
  const [questions, setQuestions] = useState([
    {
      question: 'What is "hello" in French?',
      options: ['Bonjour', 'Hola', 'Ciao', 'Hallo'],
      correctAnswer: 'Bonjour'
    },
    {
      question: 'What is "thank you" in Spanish?',
      options: ['Gracias', 'Merci', 'Danke', 'Obrigado'],
      correctAnswer: 'Gracias'
    },
    {
      question: 'What is "yes" in Japanese?',
      options: ['Hai', 'Oui', 'Ja', 'Si'],
      correctAnswer: 'Hai'
    },
    {
      question: 'What is "apple" in Mandarin?',
      options: ['Banana', 'Pineapple', 'Apple', 'Orange'],
      correctAnswer: 'Apple'
    },
    {
      question: 'What is "cat" in German?',
      options: ['Katze', 'Hund', 'Maus', 'Pferd'],
      correctAnswer: 'Katze'
    },
    {
      question: 'What is "water" in Italian?',
      options: ['Acqua', 'Fuoco', 'Aria', 'Terra'],
      correctAnswer: 'Acqua'
    },
    {
      question: 'What is "house" in Russian?',
      options: ['Дом', 'Машина', 'Книга', 'Стол'],
      correctAnswer: 'Дом'
    },
    {
      question: 'What is "sun" in Hindi?',
      options: ['सूर्य', 'चाँद', 'तारा', 'बादल'],
      correctAnswer: 'सूर्य'
    },
    {
      question: 'What is "tree" in Arabic?',
      options: ['شجرة', 'زهرة', 'حجرة', 'ماء'],
      correctAnswer: 'شجرة'
    }
  ]);

  // Function to handle option clicks
  const handleOptionClick = (selectedOption) => {
    const currentQuestion = questions[questionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 10); // Increment score by 10 points if answer is correct
      if (questionIndex === questions.length - 1) { // Check if last question is answered
        setAnsweredAllCorrectly(true); // Set flag to true if all questions are answered correctly
      } else {
        setQuestionIndex(questionIndex + 1); // Move to next question if not the last question
      }
    } else {
      setStars(stars - 1); // Decrease stars by 1 if answer is incorrect
    }
  };

  // Function to calculate grade based on score percentage
  const calculateGrade = () => {
    return score + (answeredAllCorrectly ? 10 : 0); // Add bonus points if all questions are answered correctly
  };

  // Function to render star icons based on the number of stars earned
  const renderStars = () => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(<span key={i}>⭐</span>);
    }
    return starIcons;
  };

  // JSX rendering
  return (
    <div className="language-learning-app">
      <h1>Language Learning Quiz</h1>
      {answeredAllCorrectly ? (
        <div className="result">
          <p>Congratulations! You've answered all questions correctly.</p>
          <p>Your grade: {calculateGrade()} / 100</p>
          <div className="stars">{renderStars()}</div>
          <button onClick={() => {
            setAnsweredAllCorrectly(false); // Reset quiz state when starting over
            setScore(0);
            setQuestionIndex(0);
            setStars(10);
          }}>Start Over</button>
        </div>
      ) : (
        <div>
          <div className="question">
            <p>{questions[questionIndex].question}</p>
          </div>
          <div className="options">
            {questions[questionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="feedback">
            {stars === 0 && <span>Sorry, you've run out of stars! Better luck next time! 😢</span>}
            {stars > 0 && score > 0 && <span>Great job! You've earned a star! 😊</span>}
          </div>
        </div>
      )}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(score / (questions.length * 10)) * 100}%` }}></div> // Progress bar
      </div>
    </div>
  );
};

export default LanguageLearningApp;
