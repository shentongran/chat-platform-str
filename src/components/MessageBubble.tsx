import type { Message, User } from '@shared/types';
import Avatar from './Avatar';
import { Play, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isSelf: boolean;
  sender?: User;
}

export default function MessageBubble({ message, isSelf, sender }: MessageBubbleProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>;
      case 'emoji':
        return <span className="text-4xl">{message.content}</span>;
      case 'image':
        return (
          <img
            src={message.content}
            alt="图片"
            className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
          />
        );
      case 'voice':
        return (
          <div className="flex items-center gap-2 min-w-[100px]">
            <button className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
              <Play size={14} fill="currentColor" />
            </button>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white/60 rounded-full" />
            </div>
            <span className="text-xs opacity-80">{message.duration || 3}"</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'flex gap-2.5 mb-4 animate-slide-up',
        isSelf ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isSelf && sender && (
        <Avatar src={sender.avatar} alt={sender.name} size="sm" />
      )}
      <div className={cn('flex flex-col max-w-[70%]', isSelf ? 'items-end' : 'items-start')}>
        {!isSelf && sender && (
          <span className="text-xs text-gray-400 mb-1 ml-1">{sender.name}</span>
        )}
        <div
          className={cn(
            'px-4 py-2.5 rounded-2xl shadow-soft',
            isSelf
              ? 'bg-gradient-warm text-white rounded-br-md'
              : 'bg-white dark:bg-darkwarm-100 text-gray-800 dark:text-gray-100 rounded-bl-md'
          )}
        >
          {renderContent()}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}
