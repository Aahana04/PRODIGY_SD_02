import React, { useState, useEffect } from 'react';
import { RefreshCw, Target, Trophy, ArrowUp, ArrowDown } from 'lucide-react';

function App() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [guessHistory, setGuessHistory] = useState<number[]>([]);

  // Generate random number between 1 and 100
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  // Start a new game
  const startNewGame = () => {
    const newNumber = generateRandomNumber();
    setTargetNumber(newNumber);
    setUserGuess('');
    setAttempts(0);
    setFeedback('I\'m thinking of a number between 1 and 100. Can you guess it?');
    setGameWon(false);
    setGameStarted(true);
    setGuessHistory([]);
  };

  // Handle user guess submission
  const handleGuess = () => {
    const guess = parseInt(userGuess);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a valid number between 1 and 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, guess]);

    if (guess === targetNumber) {
      setGameWon(true);
      setFeedback(`🎉 Congratulations! You guessed it in ${newAttempts} ${newAttempts === 1 ? 'attempt' : 'attempts'}!`);
    } else if (guess < targetNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }

    setUserGuess('');
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !gameWon) {
      handleGuess();
    }
  };

  // Initialize game on component mount
  useEffect(() => {
    if (!gameStarted) {
      startNewGame();
    }
  }, [gameStarted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Target className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Number Guessing Game</h1>
          <p className="text-gray-600">Test your luck and intuition!</p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{attempts}</div>
            <div className="text-sm text-gray-600">Attempts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1-100</div>
            <div className="text-sm text-gray-600">Range</div>
          </div>
          {gameWon && (
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
              <div className="text-sm text-gray-600">Winner!</div>
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-center">
            {feedback.includes('Too high') && <ArrowDown className="w-5 h-5 text-red-500 mr-2" />}
            {feedback.includes('Too low') && <ArrowUp className="w-5 h-5 text-green-500 mr-2" />}
            {feedback.includes('Congratulations') && <Trophy className="w-5 h-5 text-yellow-500 mr-2" />}
            <p className="text-gray-700">{feedback}</p>
          </div>
        </div>

        {/* Input Section */}
        {!gameWon && (
          <div className="mb-6">
            <div className="flex space-x-2">
              <input
                type="number"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your guess..."
                min="1"
                max="100"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleGuess}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                Guess
              </button>
            </div>
          </div>
        )}

        {/* Guess History */}
        {guessHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Guesses:</h3>
            <div className="flex flex-wrap gap-2">
              {guessHistory.map((guess, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    guess === targetNumber
                      ? 'bg-green-100 text-green-800'
                      : guess < targetNumber
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {guess}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* New Game Button */}
        <button
          onClick={startNewGame}
          className="w-full flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all transform hover:scale-105"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Game
        </button>

        {/* Game Rules */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">How to Play:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• I'll think of a number between 1 and 100</li>
            <li>• Enter your guess and click "Guess"</li>
            <li>• I'll tell you if your guess is too high or too low</li>
            <li>• Keep guessing until you find the correct number!</li>
            <li>• Try to win in as few attempts as possible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;