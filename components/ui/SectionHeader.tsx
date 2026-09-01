import React from 'react';

interface SectionHeaderProps {
  badge?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = ''
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col max-w-3xl mb-16 ${alignmentClasses[align]} ${className}`}>
      {badge && (
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-flex items-center gap-2 border
          ${isDark ? 'text-orange-400 bg-orange-600/20 border-orange-500/30' : 'text-orange-600 bg-orange-50 border-orange-100'}
        `}>
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4
        ${isDark ? 'text-white' : 'text-gray-900'}
      `}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed
          ${isDark ? 'text-gray-400' : 'text-gray-500'}
        `}>
          {description}
        </p>
      )}
    </div>
  );
}
