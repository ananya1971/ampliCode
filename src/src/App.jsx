import { useState } from 'react';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState([]);

  const handleQuizSubmit = (results) => {
    setQuizResults(results);
    setQuizCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Peer Learning Platform</h1>
        <p className="text-lg text-gray-600">Discover your strengths and areas for growth!</p>
      </header>

      <main className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl">
        {!quizCompleted ? (
          <Quiz onQuizSubmit={handleQuizSubmit} />
        ) : (
          <QuizResults results={quizResults} onRetakeQuiz={() => setQuizCompleted(false)} />
        )}
      </main>
    </div>
  );
}


function Quiz({ onQuizSubmit }) {

  const subjects = [
    'Math',
    'Biology',
    'Physics',
    'Chemistry',
    'Computer Science',
    'History',
    'English',
  ];

  const [ratings, setRatings] = useState(
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: 3 }), {}) 
  );

  const handleRatingChange = (subject, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [subject]: parseInt(value), 
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const results = subjects.map((subject) => ({
      subject,
      rating: ratings[subject],
      status:
        ratings[subject] >= 4
          ? 'Strength'
          : ratings[subject] <= 2
          ? 'Weakness'
          : 'Neutral',
    }));

    onQuizSubmit(results); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Rate Your Academic Proficiency</h2>
      <p className="text-gray-600 text-center mb-8">
        On a scale of 1 to 5, how proficient do you feel in each subject?
        <br />
        <span className="font-medium text-sm">(1 = Very Weak, 5 = Very Strong)</span>
      </p>

      {subjects.map((subject) => (
        <div key={subject} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm">
          <label htmlFor={subject} className="text-lg font-medium text-gray-700 mb-2 sm:mb-0 sm:w-1/3">
            {subject}:
          </label>
          <div className="flex items-center space-x-4 w-full sm:w-2/3 justify-center sm:justify-end">
            <span className="text-gray-600 text-sm">Very Weak</span>
            <input
              type="range"
              id={subject}
              name={subject}
              min="1"
              max="5"
              value={ratings[subject]}
              onChange={(e) => handleRatingChange(subject, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
            />
            <span className="text-gray-600 text-sm">Very Strong</span>
            <span className="text-blue-600 font-bold w-8 text-right">{ratings[subject]}</span>
          </div>
        </div>
      ))}

      <div className="text-center pt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit My Ratings
        </button>
      </div>
    </form>
  );
}


function QuizResults({ results, onRetakeQuiz }) {
 
  const strengths = results.filter((item) => item.status === 'Strength');
  const weaknesses = results.filter((item) => item.status === 'Weakness');

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Academic Profile</h2>

      {strengths.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">💪 Your Strengths:</h3>
          <ul className="list-disc list-inside text-left mx-auto max-w-md space-y-2">
            {strengths.map((item) => (
              <li key={item.subject} className="text-lg text-gray-700">
                <span className="font-medium">{item.subject}</span> (Rated: {item.rating}/5)
              </li>
            ))}
          </ul>
        </div>
      )}

      {weaknesses.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">Improvement Areas:</h3>
          <ul className="list-disc list-inside text-left mx-auto max-w-md space-y-2">
            {weaknesses.map((item) => (
              <li key={item.subject} className="text-lg text-gray-700">
                <span className="font-medium">{item.subject}</span> (Rated: {item.rating}/5)
              </li>
            ))}
          </ul>
        </div>
      )}

      {strengths.length === 0 && weaknesses.length === 0 && (
        <p className="text-xl text-gray-600 mb-6">
          It looks like you rated yourself neutrally across all subjects. Keep exploring!
        </p>
      )}

      <button
        onClick={onRetakeQuiz}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 mt-6"
      >
        Retake Quiz
      </button>
    </div>
  );
}

export default App;
