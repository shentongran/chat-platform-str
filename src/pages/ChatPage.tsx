import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import ConversationList from '@/components/ConversationList';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import Avatar from '@/components/Avatar';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    conversations,
    currentConversation,
    messages,
    currentUser,
    fetchConversations,
    fetchMessages,
    setCurrentConversation,
    sendMessage,
  } = useAppStore();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (id) {
      fetchMessages(id);
      const conv = conversations.find(c => c.id === id);
      if (conv) setCurrentConversation(conv);
    } else {
      setCurrentConversation(null);
    }
  }, [id, conversations, fetchMessages, setCurrentConversation]);

  const handleSend = (type: 'text' | 'emoji' | 'image' | 'voice', content: string, duration?: number) => {
    if (!id || !currentUser) return;
    sendMessage({
      conversationId: id,
      senderId: currentUser.id,
      type,
      content,
      duration,
    });
  };

  const getSender = (senderId: string) => {
    if (currentConversation?.members) {
      return currentConversation.members.find(m => m.id === senderId);
    }
    return conversations.find(c => c.id === id) ? {
      id: id,
      name: currentConversation?.name || '',
      avatar: currentConversation?.avatar || '',
      signature: '',
      status: 'offline' as const,
    } : undefined;
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-cream-50 dark:bg-darkwarm-300">
      <div className={cn(
        'w-full md:w-80 lg:w-96 border-r border-warm-100 dark:border-darkwarm-100 bg-white dark:bg-darkwarm-200',
        id && 'hidden md:block'
      )}>
        <ConversationList conversations={conversations} activeId={id} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {id && currentConversation ? (
          <>
            <div className="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-darkwarm-200/80 backdrop-blur-lg border-b border-warm-100 dark:border-darkwarm-100">
              <button
                onClick={() => navigate('/chat')}
                className="md:hidden p-2 -ml-2 text-gray-500 hover:text-warm-500 rounded-lg hover:bg-warm-50 dark:hover:bg-darkwarm-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <Avatar src={currentConversation.avatar} alt={currentConversation.name} size="md" />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {currentConversation.name}
                </h2>
                <p className="text-xs text-gray-400">
                  {currentConversation.type === 'group'
                    ? `${currentConversation.members?.length || 0} 位成员`
                    : '在线'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-400 hover:text-warm-500 rounded-lg hover:bg-warm-50 dark:hover:bg-darkwarm-100 transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-warm-500 rounded-lg hover:bg-warm-50 dark:hover:bg-darkwarm-100 transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-warm-500 rounded-lg hover:bg-warm-50 dark:hover:bg-darkwarm-100 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-gradient-soft dark:bg-darkwarm-300">
              <div className="max-w-2xl mx-auto">
                {messages.map((msg, index) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isSelf={msg.senderId === currentUser?.id}
                    sender={getSender(msg.senderId)}
                  />
                ))}
              </div>
            </div>

            <ChatInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
            <div className="w-24 h-24 mb-6 rounded-full bg-warm-100 dark:bg-darkwarm-100 flex items-center justify-center">
              <span className="text-4xl">💬</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-600 dark:text-gray-300 mb-2">
              选择一个对话开始聊天
            </h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              和最亲近的人分享生活中的每一个温暖瞬间
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
