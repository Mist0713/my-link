'use client';

import React from 'react';
import { CloseIcon, CopyIcon } from '../icons/Icons';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name: string;
  handle: string;
  onCopy: () => void;
}

export function QrCodeModal({ isOpen, onClose, url, name, handle, onCopy }: QrCodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          aria-label="닫기"
        >
          <CloseIcon size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg mb-3">
            ML
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{name}의 My-Link</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">@{handle}</p>

          {/* QR Code Container */}
          <div className="my-6 p-4 rounded-2xl bg-white border-2 border-dashed border-zinc-200 dark:border-zinc-700 shadow-inner flex flex-col items-center justify-center">
            <svg
              className="w-48 h-48"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Outer boundary markings */}
              <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="24" height="24" rx="4" fill="#18181b" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="18" y="18" width="8" height="8" rx="1" fill="#7c3aed" />
              {/* Corner 2 */}
              <rect x="66" y="10" width="24" height="24" rx="4" fill="#18181b" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="74" y="18" width="8" height="8" rx="1" fill="#7c3aed" />
              {/* Corner 3 */}
              <rect x="10" y="66" width="24" height="24" rx="4" fill="#18181b" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="18" y="74" width="8" height="8" rx="1" fill="#7c3aed" />
              
              {/* Data matrix dots */}
              <rect x="42" y="12" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="52" y="12" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="38" y="24" width="6" height="6" rx="1" fill="#7c3aed" />
              <rect x="48" y="24" width="8" height="6" rx="1" fill="#18181b" />
              <rect x="12" y="42" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="22" y="42" width="8" height="6" rx="1" fill="#7c3aed" />
              <rect x="36" y="38" width="8" height="8" rx="1" fill="#18181b" />
              <rect x="48" y="38" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="58" y="42" width="6" height="6" rx="1" fill="#7c3aed" />
              <rect x="72" y="42" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="82" y="42" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="38" y="52" width="6" height="8" rx="1" fill="#18181b" />
              <rect x="48" y="50" width="8" height="8" rx="2" fill="#7c3aed" />
              <rect x="60" y="52" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="40" y="68" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="50" y="68" width="8" height="6" rx="1" fill="#7c3aed" />
              <rect x="62" y="68" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="74" y="68" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="42" y="80" width="6" height="6" rx="1" fill="#18181b" />
              <rect x="54" y="78" width="6" height="8" rx="1" fill="#18181b" />
              <rect x="66" y="80" width="6" height="6" rx="1" fill="#7c3aed" />
              <rect x="78" y="78" width="8" height="8" rx="1" fill="#18181b" />
            </svg>
            <span className="mt-2 text-xs text-zinc-400 font-mono">카메라 앱으로 스캔하세요</span>
          </div>

          <div className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-300 mb-4">
            <span className="truncate flex-1">{url}</span>
            <button
              onClick={onCopy}
              className="p-1.5 rounded-lg bg-white dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-xs text-zinc-700 dark:text-zinc-200"
              title="링크 복사"
            >
              <CopyIcon size={14} />
            </button>
          </div>

          <button
            onClick={onCopy}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-violet-600 hover:bg-violet-700 text-white transition shadow-md shadow-violet-500/20 active:scale-98"
          >
            <CopyIcon size={16} />
            <span>프로필 링크 복사하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
