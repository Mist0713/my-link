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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-[24px] bg-white border border-[#E5E8EB] p-6 shadow-2xl transition-all text-[#191F28]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8B95A1] hover:text-[#191F28] rounded-full hover:bg-[#F2F4F6] transition"
          aria-label="닫기"
        >
          <CloseIcon size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-[16px] bg-[#E8F3FF] text-[#3182F6] flex items-center justify-center font-bold text-lg mb-3">
            ML
          </div>
          <h3 className="text-xl font-bold text-[#191F28]">{name}의 My-Link</h3>
          <p className="text-sm text-[#6B7684] mt-0.5">@{handle}</p>

          {/* QR Code Container */}
          <div className="my-5 p-4 rounded-[20px] bg-[#F2F4F6] border border-[#E5E8EB] flex flex-col items-center justify-center">
            <svg
              className="w-44 h-44"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="0" y="0" width="100" height="100" fill="#F2F4F6" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="24" height="24" rx="4" fill="#191F28" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="18" y="18" width="8" height="8" rx="1" fill="#3182F6" />
              {/* Corner 2 */}
              <rect x="66" y="10" width="24" height="24" rx="4" fill="#191F28" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="74" y="18" width="8" height="8" rx="1" fill="#3182F6" />
              {/* Corner 3 */}
              <rect x="10" y="66" width="24" height="24" rx="4" fill="#191F28" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="18" y="74" width="8" height="8" rx="1" fill="#3182F6" />
              
              {/* Data matrix dots */}
              <rect x="42" y="12" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="52" y="12" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="38" y="24" width="6" height="6" rx="1" fill="#3182F6" />
              <rect x="48" y="24" width="8" height="6" rx="1" fill="#191F28" />
              <rect x="12" y="42" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="22" y="42" width="8" height="6" rx="1" fill="#3182F6" />
              <rect x="36" y="38" width="8" height="8" rx="1" fill="#191F28" />
              <rect x="48" y="38" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="58" y="42" width="6" height="6" rx="1" fill="#3182F6" />
              <rect x="72" y="42" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="82" y="42" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="38" y="52" width="6" height="8" rx="1" fill="#191F28" />
              <rect x="48" y="50" width="8" height="8" rx="2" fill="#3182F6" />
              <rect x="60" y="52" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="40" y="68" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="50" y="68" width="8" height="6" rx="1" fill="#3182F6" />
              <rect x="62" y="68" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="74" y="68" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="42" y="80" width="6" height="6" rx="1" fill="#191F28" />
              <rect x="54" y="78" width="6" height="8" rx="1" fill="#191F28" />
              <rect x="66" y="80" width="6" height="6" rx="1" fill="#3182F6" />
              <rect x="78" y="78" width="8" height="8" rx="1" fill="#191F28" />
            </svg>
            <span className="mt-2 text-xs text-[#8B95A1] font-mono">카메라 앱으로 스캔해 보세요</span>
          </div>

          <div className="w-full flex items-center gap-2 p-3 rounded-[14px] bg-[#F2F4F6] border border-[#E5E8EB] text-xs font-mono text-[#4E5968] mb-4">
            <span className="truncate flex-1 text-left">{url}</span>
            <button
              onClick={onCopy}
              className="p-1.5 rounded-[8px] bg-white hover:bg-[#E5E8EB] transition shadow-xs text-[#191F28]"
              title="링크 복사"
            >
              <CopyIcon size={14} />
            </button>
          </div>

          <button
            onClick={onCopy}
            className="w-full h-[48px] rounded-[14px] font-bold text-sm bg-[#3182F6] hover:bg-[#1B64DA] text-white transition-all shadow-[0_2px_8px_rgba(49,130,246,0.25)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <CopyIcon size={16} />
            <span>프로필 링크 복사하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
