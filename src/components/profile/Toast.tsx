'use client';

import React from 'react';
import { CheckIcon } from '../icons/Icons';

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-zinc-900/90 text-white backdrop-blur-md shadow-2xl border border-white/10 text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white">
        <CheckIcon size={12} />
      </span>
      <span>{message}</span>
    </div>
  );
}
