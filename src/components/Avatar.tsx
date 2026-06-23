import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const dotSizeMap = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
};

export default function Avatar({ src, alt, size = 'md', online, className }: AvatarProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover border-2 border-white dark:border-darkwarm-100 shadow-soft',
          sizeMap[size]
        )}
      />
      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-darkwarm-200',
            dotSizeMap[size],
            online ? 'bg-green-400' : 'bg-gray-300'
          )}
        />
      )}
    </div>
  );
}
