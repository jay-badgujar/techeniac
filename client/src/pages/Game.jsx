import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameBg from "../assets/gamebg.jpg";

const Game = () => {
  const navigate = useNavigate();
  const [equation, setEquation] = useState({ num1: 0, operator: "+", num2: 0 });
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timer, setTimer] = useState(30);
  const [results, setResults] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let correctAnswer;
    switch (operator) {
      case "+":
        correctAnswer = num1 + num2;
        break;
      case "-":
        correctAnswer = num1 - num2;
        break;
      case "*":
        correctAnswer = num1 * num2;
        break;
      case "/":
        correctAnswer = num1 / num2;
        break;
      default:
        correctAnswer = 0;
    }

    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const randomAnswer = Math.floor(Math.random() * 20) - 10;
      if (randomAnswer !== correctAnswer && !wrongAnswers.includes(randomAnswer)) {
        wrongAnswers.push(randomAnswer);
      }
    }

    const allAnswers = [correctAnswer, ...wrongAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    setEquation({ num1, operator, num2 });
    setAnswers(allAnswers);
    setCorrectAnswer(correctAnswer);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === correctAnswer;
    setResults([
      ...results,
      {
        question: `${equation.num1} ${equation.operator} ${equation.num2}`,
        userAnswer: answer,
        correctAnswer,
        isCorrect,
      },
    ]);

    if (questionNumber < 10) {
      setQuestionNumber(questionNumber + 1);
      setTimer(30);
      setSelectedAnswer(null);
      generateEquation();
    } else {
      setIsGameOver(true);
    }
  };

  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isGameOver) {
      setResults([
        ...results,
        {
          question: `${equation.num1} ${equation.operator} ${equation.num2}`,
          userAnswer: "Time's up!",
          correctAnswer,
          isCorrect: false,
        },
      ]);

      if (questionNumber < 10) {
        setQuestionNumber(questionNumber + 1);
        setTimer(30);
        generateEquation();
      } else {
        setIsGameOver(true);
      }
    }
  }, [timer, isGameOver]);

  useEffect(() => {
    generateEquation();
  }, []);

  const resetGame = () => {
    setQuestionNumber(1);
    setTimer(30);
    setResults([]);
    setIsGameOver(false);
    generateEquation();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${gameBg})`,
        backgroundPosition: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
        {!isGameOver ? (
          <>
            <h1 className="text-4xl font-bold mb-8">Question {questionNumber}/10</h1>
            <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/20">
              <div className="text-2xl font-bold mb-4">
                {equation.num1} {equation.operator} {equation.num2} = ?
              </div>
              <div className="grid grid-cols-2 gap-4">
                {answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    className={`p-4 rounded-lg ${selectedAnswer === answer
                        ? "bg-blue-500"
                        : "bg-white/10 hover:bg-white/20"
                      } transition-all duration-300`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center text-xl">
                Time Left: {timer} seconds
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Game Over!</h1>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="text-lg bg-white/10 p-4 rounded-lg"
                >
                  <p>
                    <strong>Question:</strong> {result.question}
                  </p>
                  <p>
                    <strong>Your Answer:</strong> {result.userAnswer}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {result.correctAnswer}
                  </p>
                  <p
                    className={`${result.isCorrect ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {result.isCorrect ? "Correct!" : "Incorrect!"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-2xl font-bold text-center">
              Your Score: {results.filter((result) => result.isCorrect).length}/10
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Return to Home
              </button>
              <button
                onClick={resetGame}
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;