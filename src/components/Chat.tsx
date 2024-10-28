import React, { useState, useRef } from 'react';
import { Camera, Send, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

function Chat() {
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, messages, addMessage, addLike } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !imageUrl) return;
    if (!user) return;

    addMessage({
      id: Date.now(),
      userId: user.id,
      text: message,
      imageUrl,
      likes: 0,
      timestamp: Date.now(),
    });

    setMessage('');
    setImageUrl('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.userId === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.userId === user?.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <img
                  src={
                    useStore
                      .getState()
                      .users.find((u) => u.id === msg.userId)?.photoUrl ||
                    'https://via.placeholder.com/32'
                  }
                  alt="User"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">
                  {
                    useStore
                      .getState()
                      .users.find((u) => u.id === msg.userId)?.name
                  }
                </span>
              </div>
              {msg.text && <p className="mb-2">{msg.text}</p>}
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="Message attachment"
                  className="rounded-lg max-w-full mb-2"
                />
              )}
              <div className="flex items-center justify-end space-x-2 text-sm">
                <button
                  onClick={() => addLike(msg.id)}
                  className="flex items-center space-x-1 opacity-75 hover:opacity-100"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      msg.userId === user?.id
                        ? 'text-white'
                        : 'text-red-500'
                    }`}
                  />
                  <span>{msg.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Camera className="w-6 h-6" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Upload preview"
              className="h-20 rounded-lg"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default Chat;