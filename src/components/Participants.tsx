import React from 'react';
import { Users, Award, Coins } from 'lucide-react';
import { useStore } from '../store/useStore';

function Participants() {
  const users = useStore((state) => state.users);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2" />
        Participants
      </h2>

      <div className="space-y-4">
        {users
          .sort((a, b) => b.coins - a.coins)
          .map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg p-4 shadow flex items-center space-x-4"
            >
              <img
                src={user.photoUrl || 'https://via.placeholder.com/48'}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              
              <div className="flex-1">
                <h3 className="font-medium">{user.name}</h3>
                {user.regalia && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Award className="w-4 h-4 mr-1" />
                    {user.regalia}
                  </div>
                )}
              </div>

              <div className="flex items-center text-yellow-500">
                <Coins className="w-4 h-4 mr-1" />
                {user.coins}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Participants;