import React from 'react';
import { CheckCircle, HelpCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

function Polls() {
  const { user, polls, completePoll } = useStore();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <HelpCircle className="w-6 h-6 mr-2" />
        Polls
      </h2>

      {polls.map((poll) => {
        const isCompleted = user && poll.completedBy.includes(user.id);

        return (
          <div
            key={poll.id}
            className={`bg-white rounded-lg p-4 shadow ${
              isCompleted ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{poll.question}</h3>
              <div className="flex items-center text-yellow-500">
                <span>+{poll.coins} coins</span>
              </div>
            </div>

            <div className="space-y-2">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isCompleted && completePoll(poll.id)}
                  disabled={isCompleted}
                  className={`w-full p-3 rounded-lg text-left transition ${
                    isCompleted
                      ? 'bg-gray-100 cursor-default'
                      : 'bg-gray-50 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {isCompleted && (
              <div className="mt-3 text-sm text-gray-500 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Poll completed
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Polls;