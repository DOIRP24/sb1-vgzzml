import React from 'react';
import { Trophy, Coins } from 'lucide-react';
import { useStore } from '../store/useStore';

function Profile() {
  const { user, incrementClickCount } = useStore();
  
  if (!user) return null;

  return (
    <div className="p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.photoUrl || 'https://via.placeholder.com/60'}
          alt={user.name}
          className="w-15 h-15 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="flex items-center text-yellow-500">
            <Coins className="w-4 h-4 mr-1" />
            <span>{user.coins} coins</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={incrementClickCount}
          className="relative w-32 h-32 transform transition-transform active:scale-95"
        >
          <img
            src={user.photoUrl || 'https://via.placeholder.com/128'}
            alt="Click me"
            className="w-full h-full rounded-full border-4 border-blue-500 cursor-pointer"
          />
          <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            {user.clickCount}
          </div>
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Top Participants
        </h3>
        <div className="space-y-2">
          {/* Top 5 users sorted by coins */}
          {useStore.getState().users
            .sort((a, b) => b.coins - a.coins)
            .slice(0, 5)
            .map((participant, index) => (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 text-gray-500">#{index + 1}</span>
                  <img
                    src={participant.photoUrl || 'https://via.placeholder.com/32'}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{participant.name}</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Coins className="w-4 h-4 mr-1" />
                  {participant.coins}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;