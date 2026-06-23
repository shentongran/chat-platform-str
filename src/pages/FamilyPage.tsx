import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Heart, MessageCircle, Share2, Camera, Users } from 'lucide-react';
import Avatar from '@/components/Avatar';
import BottomNav from '@/components/BottomNav';
import { cn } from '@/lib/utils';

export default function FamilyPage() {
  const { familyGroup, photos, currentUser, fetchFamily, fetchPhotos, likePhoto } = useAppStore();
  const [activeTab, setActiveTab] = useState<'album' | 'members'>('album');

  useEffect(() => {
    fetchFamily();
    fetchPhotos();
  }, [fetchFamily, fetchPhotos]);

  const handleLike = (photoId: string) => {
    if (!currentUser) return;
    likePhoto(photoId, currentUser.id);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-darkwarm-300 pb-20 md:pb-0">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={familyGroup?.cover}
          alt="家庭封面"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">
            {familyGroup?.name}
          </h1>
          <p className="text-sm opacity-90">{familyGroup?.description}</p>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white dark:bg-darkwarm-200 rounded-2xl shadow-soft p-4 mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('album')}
              className={cn(
                'flex-1 py-2.5 rounded-xl font-medium text-sm transition-all',
                activeTab === 'album'
                  ? 'bg-gradient-warm text-white shadow-warm'
                  : 'bg-cream-50 dark:bg-darkwarm-100 text-gray-500 dark:text-gray-400'
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <Camera size={16} />
                共享相册
              </span>
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={cn(
                'flex-1 py-2.5 rounded-xl font-medium text-sm transition-all',
                activeTab === 'members'
                  ? 'bg-gradient-warm text-white shadow-warm'
                  : 'bg-cream-50 dark:bg-darkwarm-100 text-gray-500 dark:text-gray-400'
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <Users size={16} />
                家庭成员
              </span>
            </button>
          </div>

          {activeTab === 'album' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative group rounded-xl overflow-hidden shadow-soft animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={photo.url}
                    alt="家庭照片"
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleLike(photo.id)}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={16}
                        className={cn(
                          photo.likes.includes(currentUser?.id || '')
                            ? 'fill-red-500 text-red-500'
                            : ''
                        )}
                      />
                      {photo.likes.length}
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="hover:scale-110 transition-transform">
                        <MessageCircle size={16} />
                      </button>
                      <button className="hover:scale-110 transition-transform">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="relative aspect-square rounded-xl border-2 border-dashed border-warm-200 dark:border-darkwarm-100 flex flex-col items-center justify-center text-warm-400 hover:border-warm-400 hover:bg-warm-50 dark:hover:bg-darkwarm-100 transition-all">
                <Camera size={28} className="mb-1" />
                <span className="text-xs">上传照片</span>
              </button>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-3">
              {familyGroup?.members.map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-50 dark:hover:bg-darkwarm-100 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    size="lg"
                    online={member.status === 'online'}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {member.signature}
                    </p>
                  </div>
                  {member.mood && (
                    <span className="px-3 py-1 text-xs bg-soft-pink/50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 rounded-full">
                      {member.mood}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
