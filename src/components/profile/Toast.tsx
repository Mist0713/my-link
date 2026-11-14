'use client';

import React from 'react';
import { CheckIcon } from '../icons/Icons';

interface ToastProps {
  message: string;
  visible: boolean;
}

/**
 * Toss Design System (TDS) Toast 규격
 * - 표면: grey-900 (#191F28) + 흰색 라벨
 * - 모서리: radius-l (14px)
 * - 그림자: shadow-toast (0 8px 24px rgba(25, 31, 40, 0.16))
 * - 성공 아이콘: 20px green-500 원 + 흰 체크
 */
export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[#191F28] text-white shadow-[0_8px_24px_rgba(25,31,40,0.16)] text-[15px] font-medium transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white flex-shrink-0">
        <CheckIcon size={12} />
      </span>
      <span>{message}</span>
    </div>
  );
}
