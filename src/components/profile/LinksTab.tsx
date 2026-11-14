'use client';

import React from 'react';
import { LinkItem, ProfileTheme } from '../../types/profile';
import { themeConfigs } from '../../utils/theme';
import {
  ExternalLinkIcon,
  GlobeIcon,
  SparklesIcon,
} from '../icons/Icons';

interface LinksTabProps {
  links: LinkItem[];
  theme: ProfileTheme;
  onLinkClick: (id: string, url: string) => void;
}

export function LinksTab({ links, theme, onLinkClick }: LinksTabProps) {
  const currentTheme = themeConfigs[theme] || themeConfigs.violet;

  if (links.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-400">
        <GlobeIcon size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">등록된 링크가 아직 없습니다.</p>
        <p className="text-xs text-zinc-500 mt-1">상단의 [편집] 버튼을 눌러 링크를 추가해보세요!</p>
      </div>
    );
  }

  // Sort pinned links to top
  const sortedLinks = [...links].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="space-y-3.5">
      {sortedLinks.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            onLinkClick(item.id, item.url);
          }}
          className={`group block p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/90 shadow-sm transition-all duration-200 ${currentTheme.cardHover} hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden`}
        >
          {item.pinned && (
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
              <div className="absolute transform rotate-45 bg-amber-500 text-white font-bold text-[9px] py-0.5 right-[-35px] top-[14px] w-[110px] text-center shadow-xs">
                PINNED
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                  {item.title}
                </h3>
                {item.badge && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${currentTheme.badgeBg}`}
                  >
                    <SparklesIcon size={10} />
                    {item.badge}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {item.description}
                </p>
              )}

              <div className="mt-2 flex items-center gap-3 text-[11px] text-zinc-400">
                <span className="font-mono truncate max-w-[200px] sm:max-w-xs">
                  {item.url.replace(/^https?:\/\//, '')}
                </span>
                <span>•</span>
                <span>조회수 {item.clicks.toLocaleString()}회</span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-600 dark:group-hover:text-white transition duration-200 flex-shrink-0 group-hover:translate-x-0.5">
              <ExternalLinkIcon size={16} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
