import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Plus, Calendar, Gift, Heart, Star, Trash2, Bell, BellOff } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { cn } from '@/lib/utils';
import type { Anniversary } from '@shared/types';

const typeConfig = {
  birthday: { icon: Gift, label: '生日', color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  wedding: { icon: Heart, label: '结婚纪念', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
  memorial: { icon: Star, label: '纪念日', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  other: { icon: Calendar, label: '其他', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
};

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setFullYear(today.getFullYear());
  
  if (target < today) {
    target.setFullYear(today.getFullYear() + 1);
  }
  
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function AnniversaryPage() {
  const { anniversaries, fetchAnniversaries, addAnniversary, deleteAnniversary } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [newAnn, setNewAnn] = useState({
    title: '',
    date: '',
    type: 'birthday' as Anniversary['type'],
    description: '',
    remind: true,
  });

  useEffect(() => {
    fetchAnniversaries();
  }, [fetchAnniversaries]);

  const sortedAnniversaries = [...anniversaries].sort(
    (a, b) => getDaysUntil(a.date) - getDaysUntil(b.date)
  );

  const handleAdd = () => {
    if (!newAnn.title || !newAnn.date) return;
    addAnniversary(newAnn);
    setShowModal(false);
    setNewAnn({ title: '', date: '', type: 'birthday', description: '', remind: true });
  };

  const upcoming = sortedAnniversaries.find(a => getDaysUntil(a.date) <= 30 && getDaysUntil(a.date) >= 0);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-darkwarm-300 pb-20 md:pb-0">
      <div className="bg-gradient-warm text-white p-6 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h1 className="text-2xl font-display font-bold mb-1">重要日子</h1>
          <p className="text-sm opacity-90">记录每一个值得纪念的时刻</p>
        </div>
      </div>

      <div className="px-4 -mt-10 relative z-10">
        {upcoming && (
          <div className="bg-white dark:bg-darkwarm-200 rounded-2xl shadow-warm p-5 mb-4 animate-slide-up overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warm-100 to-soft-pink rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-medium bg-warm-100 dark:bg-warm-900/30 text-warm-600 dark:text-warm-400 rounded-full">
                  即将到来
                </span>
                {upcoming.remind && (
                  <Bell size={16} className="text-warm-500 animate-bounce-soft" />
                )}
              </div>
              
              <h2 className="text-xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
                {upcoming.title}
              </h2>
              
              <div className="flex items-end gap-2 mb-3">
                <span className="text-5xl font-display font-bold text-gradient">
                  {getDaysUntil(upcoming.date)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 mb-2">天后</span>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {upcoming.date}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">全部纪念日</h3>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-4 py-2 bg-gradient-warm text-white text-sm font-medium rounded-full shadow-warm hover:shadow-lg transition-all active:scale-95"
          >
            <Plus size={16} />
            添加
          </button>
        </div>

        <div className="space-y-3">
          {sortedAnniversaries.map((ann, index) => {
            const days = getDaysUntil(ann.date);
            const config = typeConfig[ann.type];
            const Icon = config.icon;
            
            return (
              <div
                key={ann.id}
                className="bg-white dark:bg-darkwarm-200 rounded-xl p-4 shadow-soft flex items-center gap-4 animate-slide-up group hover:shadow-md transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', config.bg)}>
                  <Icon size={24} className={config.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">
                    {ann.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {ann.date} · {config.label}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-display font-bold text-gradient">
                    {days}
                  </div>
                  <div className="text-xs text-gray-400">天后</div>
                </div>
                
                <button
                  onClick={() => deleteAnniversary(ann.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-darkwarm-200 rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 animate-slide-up">
            <h3 className="text-xl font-display font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
              添加纪念日
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  标题
                </label>
                <input
                  type="text"
                  value={newAnn.title}
                  onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                  placeholder="例如：妈妈的生日"
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-darkwarm-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  日期
                </label>
                <input
                  type="date"
                  value={newAnn.date}
                  onChange={(e) => setNewAnn({ ...newAnn, date: e.target.value })}
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-darkwarm-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  类型
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(Object.keys(typeConfig) as Anniversary['type'][]).map((type) => {
                    const config = typeConfig[type];
                    const Icon = config.icon;
                    return (
                      <button
                        key={type}
                        onClick={() => setNewAnn({ ...newAnn, type })}
                        className={cn(
                          'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
                          newAnn.type === type
                            ? 'bg-warm-100 dark:bg-warm-900/30 ring-2 ring-warm-400'
                            : 'bg-cream-50 dark:bg-darkwarm-100 hover:bg-warm-50 dark:hover:bg-darkwarm-50'
                        )}
                      >
                        <Icon size={20} className={config.color} />
                        <span className="text-xs text-gray-600 dark:text-gray-300">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  备注（可选）
                </label>
                <input
                  type="text"
                  value={newAnn.description}
                  onChange={(e) => setNewAnn({ ...newAnn, description: e.target.value })}
                  placeholder="添加一些备注..."
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-darkwarm-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-warm-300 transition-all"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  到期提醒
                </span>
                <button
                  onClick={() => setNewAnn({ ...newAnn, remind: !newAnn.remind })}
                  className={cn(
                    'w-12 h-7 rounded-full transition-all relative',
                    newAnn.remind ? 'bg-warm-500' : 'bg-gray-300 dark:bg-darkwarm-100'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all',
                      newAnn.remind ? 'left-[22px]' : 'left-0.5'
                    )}
                  />
                </button>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-cream-50 dark:bg-darkwarm-100 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-cream-100 dark:hover:bg-darkwarm-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-3 bg-gradient-warm text-white font-medium rounded-xl shadow-warm hover:shadow-lg transition-all active:scale-95"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
