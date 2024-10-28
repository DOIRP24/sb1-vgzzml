import React from 'react';
import { format, isToday, parseISO } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

function Schedule() {
  const schedule = useStore((state) => state.schedule);
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentTime = format(currentDate, 'HH:mm');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Event Schedule
      </h2>

      <div className="space-y-4">
        {days.map((day, index) => (
          <div
            key={day}
            className={`bg-white rounded-lg p-4 shadow ${
              currentDay === index + 1 ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <h3 className="text-lg font-semibold mb-3">{day}</h3>
            <div className="space-y-3">
              {schedule
                .filter((item) => item.day === index + 1)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg ${
                      currentDay === index + 1 &&
                      item.startTime <= currentTime &&
                      item.endTime >= currentTime
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.startTime} - {item.endTime}
                    </div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                    {item.location && (
                      <div className="text-sm text-gray-500 mt-1">
                        📍 {item.location}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;