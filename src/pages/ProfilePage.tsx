import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Settings,
  Bell,
  Shield,
  Moon,
  HelpCircle,
  Info,
  ChevronRight,
  Camera,
  Edit3,
  Heart,
  MessageCircle,
  CalendarHeart,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import Avatar from '@/components/Avatar';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { currentUser, darkMode, fetchCurrentUser, toggleDarkMode, updateUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editSignature, setEditSignature] = useState('');
  const [editMood, setEditMood] = useState('');

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleSave = () => {
    updateUser({
      name: editName || currentUser?.name,
      signature: editSignature || currentUser?.signature,
      mood: editMood || currentUser?.mood,
    });
    setIsEditing(false);
  };

  const stats = [
    { icon: Heart, label: '收藏', value: 12 },
    { icon: MessageCircle, label: '聊天', value: 8 },
    { icon: CalendarHeart, label: '纪念日', value: 5 },
  ];

  const settingGroups = [
    {
      title: '通用',
      items: [
        { icon: Bell, label: '消息通知', desc: '管理消息提醒方式', hasToggle: false },
        {
          icon: Moon,
          label: '深色模式',
          desc: '保护眼睛，舒适阅读',
          hasToggle: true,
          toggleValue: darkMode,
          onToggle: toggleDarkMode,
        },
      ],
    },
    {
      title: '隐私与安全',
      items: [
        { icon: Shield, label: '隐私设置', desc: '管理你的隐私', hasToggle: false },
      ],
    },
    {
      title: '其他',
      items: [
        { icon: HelpCircle, label: '帮助与反馈', desc: '常见问题和意见反馈', hasToggle: false },
        { icon: Info, label: '关于暖聊', desc: '版本 1.0.0', hasToggle: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-darkwarm-300 pb-20 md:pb-0">
      <div className="bg-gradient-warm text-white p-6 pb-24 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold">我的</h1>
            <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
              <Settings size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.name || ''}
                size="xl"
                className="ring-4 ring-white/30"
              />
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg text-warm-500 hover:scale-110 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="昵称"
                    className="w-full px-3 py-1.5 bg-white/20 backdrop-blur rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  <input
                    type="text"
                    value={editSignature}
                    onChange={(e) => setEditSignature(e.target.value)}
                    placeholder="个性签名"
                    className="w-full px-3 py-1.5 bg-white/20 backdrop-blur rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-1 bg-white text-warm-500 text-sm font-medium rounded-lg"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-lg"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={() => {
                  setEditName(currentUser?.name || '');
                  setEditSignature(currentUser?.signature || '');
                  setEditMood(currentUser?.mood || '');
                  setIsEditing(true);
                }} className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-display font-bold truncate">
                      {currentUser?.name}
                    </h2>
                    <Edit3 size={16} className="opacity-70" />
                  </div>
                  <p className="text-sm opacity-90 truncate">
                    {currentUser?.signature}
                  </p>
                  {currentUser?.mood && (
                    <span className="inline-block mt-2 px-3 py-0.5 bg-white/20 backdrop-blur rounded-full text-xs">
                      心情：{currentUser.mood}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-12 relative z-10">
        <div className="bg-white dark:bg-darkwarm-200 rounded-2xl shadow-soft p-4 mb-4">
          <div className="flex justify-around">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-warm-50 dark:bg-darkwarm-100 flex items-center justify-center mb-2 text-warm-500">
                    <Icon size={20} />
                  </div>
                  <span className="text-lg font-display font-bold text-gray-800 dark:text-gray-100">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {settingGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="bg-white dark:bg-darkwarm-200 rounded-2xl shadow-soft overflow-hidden animate-slide-up"
              style={{ animationDelay: `${groupIndex * 50}ms` }}
            >
              <div className="px-4 pt-3 pb-2">
                <h3 className="text-sm font-medium text-gray-400">{group.title}</h3>
              </div>
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.onToggle}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream-50 dark:hover:bg-darkwarm-100 transition-colors',
                      itemIndex > 0 && 'border-t border-warm-50 dark:border-darkwarm-100'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-warm-50 dark:bg-darkwarm-100 flex items-center justify-center text-warm-500">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    {item.hasToggle ? (
                      <div
                        className={cn(
                          'w-11 h-6 rounded-full transition-all relative',
                          item.toggleValue ? 'bg-warm-500' : 'bg-gray-300 dark:bg-darkwarm-100'
                        )}
                      >
                        <div
                          className={cn(
                            'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all',
                            item.toggleValue ? 'left-[22px]' : 'left-0.5'
                          )}
                        />
                      </div>
                    ) : (
                      <ChevronRight size={18} className="text-gray-300" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-6 mb-8 text-center">
          <p className="text-xs text-gray-400">
            暖聊 · 让每一次对话都充满温度
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
            Made with ❤️ for loved ones
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
