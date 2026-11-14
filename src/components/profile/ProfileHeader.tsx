'use client';

import React from 'react';
import Image from 'next/image';
import { ProfileData } from '../../types/profile';
import {
  BuildingIcon,
  CheckIcon,
  EditIcon,
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  QrCodeIcon,
  ShareIcon,
  SparklesIcon,
  TwitterIcon,
} from '../icons/Icons';

interface ProfileHeaderProps {
  profile: ProfileData;
  onOpenEdit: () => void;
  onOpenQr: () => void;
  onShare: () => void;
}

/**
 * Toss Design System (TDS) 기반 프로필 헤더 카드
 * - 차갑고 절제된 화이트 캔버스 표면 (#FFFFFF) + 1px 헤어라인 보더 (#E5E8EB)
 * - 단일 강조색 토스 블루 (#3182F6, blue-500)
 * - 유능한 친구처럼 친절한 해요체 카피
 * - 24px 라운드 카드 (radius-3xl) 및 정밀한 타이포 램프
 */
export function ProfileHeader({
  profile,
  onOpenEdit,
  onOpenQr,
  onShare,
}: ProfileHeaderProps) {
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <GithubIcon size={18} />;
      case 'linkedin':
        return <LinkedInIcon size={18} />;
      case 'instagram':
        return <InstagramIcon size={18} />;
      case 'twitter':
        return <TwitterIcon size={18} />;
      case 'email':
        return <MailIcon size={18} />;
      case 'website':
      default:
        return <GlobeIcon size={18} />;
    }
  };

  return (
    <section
      aria-label="프로필 정보"
      className="w-full bg-white rounded-[24px] border border-[#E5E8EB] shadow-[0_2px_8px_rgba(25,31,40,0.04)] p-6 sm:p-7 transition-all duration-200 text-[#191F28]"
    >
      {/* 상단 프로필 이미지 & 기본 정보 스택 */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* 아바타 이미지 (TDS 24px 라운드 큐브/원형) */}
        <div className="relative flex-shrink-0">
          <div className="w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-[24px] overflow-hidden border border-[#E5E8EB] bg-[#F2F4F6] relative shadow-[0_2px_6px_rgba(25,31,40,0.04)]">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          {/* 활동 상태 표시등 */}
          <span
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs"
            title="현재 활동 중이에요"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        {/* 텍스트 정보 */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          {/* 협업 가능 뱃지 (TDS Brand-weak pill) */}
          {profile.isAvailableForHire && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3FF] text-[#3182F6] text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3182F6] animate-ping" />
              <span>커피챗 & 협업 가능해요</span>
            </div>
          )}

          {/* 이름 & 인증 마크 */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#191F28]">
              {profile.name}
            </h1>
            <span className="text-sm font-medium text-[#8B95A1]">
              ({profile.englishName})
            </span>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#3182F6] text-white shadow-xs"
              title="인증된 프로필이에요"
            >
              <CheckIcon size={12} />
            </span>
          </div>

          {/* 핸들 & 헤드라인 */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-sm font-medium text-[#4E5968] mt-1">
            <span className="text-[#3182F6] font-semibold font-mono">
              @{profile.handle}
            </span>
            <span className="text-[#D1D6DB]">•</span>
            <span className="text-[#333D4B] font-semibold">{profile.headline}</span>
          </div>

          {/* 소속 & 위치 */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-3 text-xs text-[#6B7684] mt-2">
            <div className="flex items-center gap-1">
              <BuildingIcon size={13} className="text-[#8B95A1]" />
              <span>{profile.organization} {profile.department}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon size={13} className="text-[#8B95A1]" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 상태 메시지 콜아웃 (TDS 정보 컨테이너) */}
      {profile.statusMessage && (
        <div className="mt-4 p-3.5 rounded-[16px] bg-[#F2F4F6] text-[#333D4B] text-[13px] font-medium flex items-center gap-2">
          <SparklesIcon size={15} className="text-[#3182F6] flex-shrink-0" />
          <span className="leading-snug">{profile.statusMessage}</span>
        </div>
      )}

      {/* 소개글 (TDS body-2: 15px Regular / 1.5 line-height) */}
      <p className="mt-4 text-[15px] leading-[1.6] text-[#4E5968] whitespace-pre-line text-left">
        {profile.bio}
      </p>

      {/* 기술 스택 칩 (TDS Chips) */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="h-[32px] px-3.5 rounded-full bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] text-[13px] font-medium inline-flex items-center transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 소셜 링크 아이콘 바 */}
      <div className="mt-5 pt-4 border-t border-[#E5E8EB] flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {profile.socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#F2F4F6] hover:bg-[#E8F3FF] text-[#4E5968] hover:text-[#3182F6] flex items-center justify-center transition-all active:scale-95"
              title={social.label}
              aria-label={social.label}
            >
              {renderSocialIcon(social.platform)}
            </a>
          ))}
        </div>

        {/* 액션 버튼 그룹 (TDS 단일 강조색 규칙: Primary CTA는 1개만) */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-end">
          <button
            onClick={onOpenQr}
            className="h-[44px] px-3.5 rounded-[14px] bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#191F28] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition active:scale-95"
            title="QR 코드 보기"
          >
            <QrCodeIcon size={15} />
            <span className="hidden sm:inline">QR</span>
          </button>
          <button
            onClick={onOpenEdit}
            className="h-[44px] px-3.5 rounded-[14px] bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#191F28] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition active:scale-95"
            title="프로필 편집하기"
          >
            <EditIcon size={14} />
            <span>편집</span>
          </button>
          <button
            onClick={onShare}
            className="h-[44px] px-4 rounded-[14px] bg-[#3182F6] hover:bg-[#1B64DA] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(49,130,246,0.25)] transition active:scale-95"
            title="프로필 링크 공유하기"
          >
            <ShareIcon size={14} />
            <span>공유하기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
