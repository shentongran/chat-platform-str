import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { Conversation } from '@shared/types';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function ConversationList({ conversations, activeId }: ConversationListProps) {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-white dark:bg-darkwarm-200">
      <div className="p-4 border-b border-warm-100 dark:border-darkwarm-100">
        <h1 className="text-2xl font-display font-bold text-gradient mb-4">暖聊</h1>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索联系人..."
            className="w-full pl-10 pr-4 py-2.5 bg-cream-50 dark:bg-darkwarm-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {conversations.map((conv, index) => (
          <button
            key={conv.id}
            onClick={() => navigate(`/chat/${conv.id}`)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 hover:bg-cream-50 dark:hover:bg-darkwarm-100 transition-colors animate-slide-up',
              activeId === conv.id && 'bg-cream-100 dark:bg-darkwarm-100',
              index > 0 && 'border-t border-warm-50 dark:border-darkwarm-100'
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <Avatar src={conv.avatar} alt={conv.name} size="lg" />
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
                  {conv.name}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {formatTime(conv.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate pr-2">
                  {conv.lastMessage}
                </p>
                {conv.unreadCount > 0 && (
                  <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-warm-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {conv.unreadCount > 99 ? '99+' : conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
