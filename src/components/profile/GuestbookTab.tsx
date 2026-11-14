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
    message: '포트폴리오 너무 멋져요! 해커톤 수상 축하드립니다 🔥',
    createdAt: '1시간 전',
    avatarColor: 'bg-indigo-500',
  },
  {
    id: 'm2',
    name: '박서연',
    message: '블로그 Next.js 16 최적화 글 잘 읽었습니다. 큰 도움 되었어요!',
    createdAt: '어제',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'm3',
    name: '최현우 (스타트업 대표)',
    message: '지원님 프로필 잘 봤습니다. 기회가 된다면 커피챗 나눠보고 싶습니다 :)',
    createdAt: '3일 전',
    avatarColor: 'bg-rose-500',
  },
];

const avatarColors = [
  'bg-blue-500',
  'bg-violet-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-cyan-500',
];

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
    onToast('응원 메시지가 등록되었습니다! ✨');
  };

  return (
    <div className="space-y-6">
      {/* Leave Message Form */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquareIcon size={18} className="text-violet-600 dark:text-violet-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            방명록 & 응원 남기기
          </h3>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          프로필을 방문해주셔서 감사합니다. 가벼운 인사나 응원의 한마디를 남겨주세요!
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="작성자 이름 / 닉네임"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="따뜻한 응원이나 메시지를 적어주세요..."
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-violet-600 hover:bg-violet-700 text-white transition shadow-sm active:scale-98 flex items-center justify-center gap-2"
          >
            <HeartIcon size={14} className="text-rose-200" />
            <span>메시지 남기기</span>
          </button>
        </form>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1">
          받은 메시지 ({messages.length})
        </h4>

        {messages.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-start gap-3.5 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div
              className={`w-9 h-9 rounded-full ${item.avatarColor} text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs`}
            >
              {item.name.slice(0, 1)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {item.name}
                </span>
                <span className="text-[11px] text-zinc-400">{item.createdAt}</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed break-words">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
