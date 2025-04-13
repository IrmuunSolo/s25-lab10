import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quizCore] = useState<QuizCore>(new QuizCore());
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Current question change handler
  useEffect(() => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
  }, [quizCore]);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    
    // Answer the current question if an option is selected
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());
    }

    // Move to next question or complete quiz
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <h2>No questions available</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button 
        onClick={handleButtonClick}
        disabled={!selectedAnswer}
      >
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default Quiz;