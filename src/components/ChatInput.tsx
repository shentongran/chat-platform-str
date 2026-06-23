import { useState, useRef } from 'react';
import { Send, Smile, Image, Mic, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (type: 'text' | 'emoji' | 'image' | 'voice', content: string, duration?: number) => void;
  disabled?: boolean;
}

const emojis = ['😊', '🥰', '😘', '🤗', '😂', '😭', '🥺', '😴', '🤔', '👍', '❤️', '🌹', '🎉', '✨', '💪', '🙏'];

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend('text', text.trim());
    setText('');
    setShowEmoji(false);
  };

  const handleEmojiClick = (emoji: string) => {
    if (showEmoji) {
      onSend('emoji', emoji);
    } else {
      setText(prev => prev + emoji);
      inputRef.current?.focus();
    }
  };

  const handleImageUpload = () => {
    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    onSend('image', randomImage);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      onSend('voice', 'voice_message', 3);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-white dark:bg-darkwarm-100 rounded-2xl shadow-warm animate-slide-up">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">表情</span>
            <button
              onClick={() => setShowEmoji(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {emojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:scale-125 transition-transform p-1 rounded-lg hover:bg-cream-100 dark:hover:bg-darkwarm-200"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 p-3 bg-white/80 dark:bg-darkwarm-200/80 backdrop-blur-lg border-t border-warm-100 dark:border-darkwarm-100">
        <div className="flex gap-1">
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className={cn(
              'p-2.5 rounded-xl transition-all',
              showEmoji
                ? 'bg-warm-100 text-warm-500'
                : 'text-gray-400 hover:text-warm-500 hover:bg-warm-50 dark:hover:bg-darkwarm-100'
            )}
          >
            <Smile size={22} />
          </button>
          <button
            onClick={handleImageUpload}
            className="p-2.5 rounded-xl text-gray-400 hover:text-warm-500 hover:bg-warm-50 dark:hover:bg-darkwarm-100 transition-all"
          >
            <Image size={22} />
          </button>
        </div>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="说点什么..."
            disabled={disabled || isRecording}
            className={cn(
              'w-full px-4 py-2.5 bg-cream-50 dark:bg-darkwarm-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 transition-all',
              isRecording && 'bg-red-50 dark:bg-red-900/20 text-red-500'
            )}
          />
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">正在录音... 点击结束</span>
            </div>
          )}
        </div>

        {text.trim() ? (
          <button
            onClick={handleSend}
            disabled={disabled}
            className="p-2.5 bg-gradient-warm text-white rounded-xl shadow-warm hover:shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            <Send size={22} />
          </button>
        ) : (
          <button
            onClick={toggleRecording}
            disabled={disabled}
            className={cn(
              'p-2.5 rounded-xl transition-all',
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-400 hover:text-warm-500 hover:bg-warm-50 dark:hover:bg-darkwarm-100'
            )}
          >
            <Mic size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
