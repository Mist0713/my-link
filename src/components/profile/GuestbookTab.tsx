'use client';

import React, { useState } from 'react';
import { GuestbookMessage, ProfileTheme } from '../../types/profile';
import { HeartIcon, MessageSquareIcon } from '../icons/Icons';

interface GuestbookTabProps {
  theme: ProfileTheme;
  onToast: (msg: string) => void;
}

const defaultMessages: GuestbookMessage[] = [
  {
    id: 'm1',
    name: '김민준',
    message: '포트폴리오 너무 멋져요! 해커톤 수상 축하드려요 🔥',
    createdAt: '1시간 전',
    avatarColor: 'bg-[#3182F6]',
  },
  {
    id: 'm2',
    name: '박서연',
    message: '블로그 Next.js 최적화 글 정말 잘 읽었어요. 큰 도움 되었어요!',
    createdAt: '어제',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'm3',
    name: '최현우 (스타트업 대표)',
    message: '지원님 프로필 잘 봤습니다. 기회가 된다면 커피챗 나눠보고 싶어요 :)',
    createdAt: '3일 전',
    avatarColor: 'bg-rose-500',
  },
];

const avatarColors = [
  'bg-[#3182F6]',
  'bg-emerald-500',
  'bg-indigo-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-teal-500',
];

/**
 * Toss Design System (TDS) 방명록 컴포넌트
 * - TDS TextField (48px 높이, grey-100 배경, 포커스 시 blue-500 1.5px 보더)
 * - TDS Primary CTA ("메시지 남기기")
 */
export function GuestbookTab({ onToast }: GuestbookTabProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>(defaultMessages);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    const newMessage: GuestbookMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: content.trim(),
      createdAt: '방금 전',
      avatarColor: randomColor,
    };

    setMessages([newMessage, ...messages]);
    setName('');
    setContent('');
    onToast('따뜻한 응원 메시지가 등록되었어요! ✨');
  };

  return (
    <div className="space-y-4">
      {/* Leave Message Form Card */}
      <div className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#E5E8EB] shadow-[0_1px_3px_rgba(25,31,40,0.04)]">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquareIcon size={18} className="text-[#3182F6]" />
          <h3 className="text-base font-bold text-[#191F28]">
            방명록 & 응원 남기기
          </h3>
        </div>
        <p className="text-xs text-[#6B7684] mb-4">
          프로필을 방문해 주셔서 감사해요. 가벼운 인사나 응원 한마디를 남겨주세요!
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            {/* TDS Text Field */}
            <input
              type="text"
              placeholder="작성자 이름 / 닉네임"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[48px] px-4 rounded-[12px] border border-[#E5E8EB] bg-[#F2F4F6] text-sm text-[#191F28] placeholder:text-[#8B95A1] focus:bg-white focus:outline-none focus:border-[1.5px] focus:border-[#3182F6] transition-all"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="따뜻한 응원이나 메시지를 적어주세요..."
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-[12px] border border-[#E5E8EB] bg-[#F2F4F6] text-sm text-[#191F28] placeholder:text-[#8B95A1] focus:bg-white focus:outline-none focus:border-[1.5px] focus:border-[#3182F6] transition-all resize-none"
              required
            />
          </div>
          {/* TDS Button Primary */}
          <button
            type="submit"
            className="w-full h-[48px] rounded-[14px] font-bold text-sm bg-[#3182F6] hover:bg-[#1B64DA] text-white transition-all shadow-[0_2px_8px_rgba(49,130,246,0.2)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <HeartIcon size={14} className="text-white" />
            <span>메시지 남기기</span>
          </button>
        </form>
      </div>

      {/* Messages List */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-[#8B95A1] px-1">
          받은 메시지 ({messages.length})
        </h4>

        {messages.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-[18px] bg-white border border-[#E5E8EB] shadow-[0_1px_3px_rgba(25,31,40,0.04)] flex items-start gap-3.5 transition-all hover:border-[#3182F6]/30"
          >
            <div
              className={`w-9 h-9 rounded-full ${item.avatarColor} text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs`}
            >
              {item.name.slice(0, 1)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#191F28] truncate">
                  {item.name}
                </span>
                <span className="text-[11px] text-[#8B95A1]">{item.createdAt}</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#4E5968] leading-relaxed break-words">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
