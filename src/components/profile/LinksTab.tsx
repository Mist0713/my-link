'use client';

import React from 'react';
import { LinkItem, ProfileTheme } from '../../types/profile';
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

/**
 * Toss Design System (TDS) ListRow 패턴 링크 탭
 * - 44px 아이콘 컨테이너 (radius 14px)
 * - 15px/17px 타이틀 & 서브타이틀 위계
 * - 우측 화살표 슬롯 및 정밀한 1px 헤어라인 보더
 */
export function LinksTab({ links, onLinkClick }: LinksTabProps) {
  if (links.length === 0) {
    return (
      <div className="py-12 text-center text-[#8B95A1] bg-white rounded-[20px] border border-[#E5E8EB] p-8">
        <GlobeIcon size={36} className="mx-auto mb-2.5 text-[#B0B8C1]" />
        <p className="text-sm font-semibold text-[#4E5968]">등록된 링크가 아직 없어요</p>
        <p className="text-xs text-[#8B95A1] mt-1">상단의 [편집] 버튼을 눌러 새 링크를 추가해 보세요!</p>
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
    <div className="space-y-3">
      {sortedLinks.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            onLinkClick(item.id, item.url);
          }}
          className="group block p-4 sm:p-5 rounded-[20px] bg-white border border-[#E5E8EB] hover:border-[#3182F6]/50 shadow-[0_1px_3px_rgba(25,31,40,0.04)] hover:shadow-[0_4px_16px_rgba(49,130,246,0.08)] transition-all duration-150 relative overflow-hidden active:scale-[0.99]"
        >
          {item.pinned && (
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
              <div className="absolute transform rotate-45 bg-[#3182F6] text-white font-extrabold text-[9px] py-0.5 right-[-35px] top-[14px] w-[110px] text-center shadow-xs">
                고정됨
              </div>
            </div>
          )}

          <div className="flex items-center gap-3.5">
            {/* 44px 좌측 아이콘 슬롯 (TDS ListRow 규격: radius 14px) */}
            <div className="w-11 h-11 rounded-[14px] bg-[#F2F4F6] text-[#3182F6] group-hover:bg-[#E8F3FF] flex items-center justify-center flex-shrink-0 transition-colors">
              <GlobeIcon size={20} />
            </div>

            {/* 타이틀 & 서브타이틀 스택 */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-[#191F28] text-[15px] sm:text-base group-hover:text-[#3182F6] transition-colors truncate">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F3FF] text-[#3182F6]">
                    <SparklesIcon size={10} />
                    {item.badge}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs sm:text-[13px] text-[#6B7684] line-clamp-1 leading-normal">
                  {item.description}
                </p>
              )}

              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8B95A1]">
                <span className="font-mono truncate max-w-[180px]">
                  {item.url.replace(/^https?:\/\//, '')}
                </span>
                <span>•</span>
                <span className="tabular-nums">조회수 {item.clicks.toLocaleString()}회</span>
              </div>
            </div>

            {/* 우측 액션 슬롯 (TDS Chevron / External Link) */}
            <div className="w-8 h-8 rounded-full bg-[#F2F4F6] text-[#8B95A1] group-hover:bg-[#3182F6] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-150 group-hover:translate-x-0.5">
              <ExternalLinkIcon size={14} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
