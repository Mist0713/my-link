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
 * [Neobrutalism 스타일 가이드 적용 프로필 카드]
 * - 굵은 검은 테두리: 3px solid black
 * - 하드 그림자: 6px 6px 0 black (블러 없음)
 * - 배경색: 밝은 노란색 (#FEF08A)
 * - 둥근 모서리: 12px
 *
 * [프로필 카드]
 * - 위 스타일 적용
 * - 패딩: 24px, 중앙 정렬
 *
 * [프로필 이미지]
 * - 형태: 원형 (border-radius: 50%)
 * - 크기: 120px x 120px
 * - 테두리: 3px solid black
 * - 하드 그림자: 4px 4px 0 black
 *
 * [반응형]
 * - 모바일 (360px~767px): 카드 너비 100%, 패딩 16px
 * - 태블릿 (768px~1023px): 카드 너비 80%, 최대 480px
 * - 데스크탑 (1024px~): 카드 너비 400px 고정
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
      aria-label="프로필 섹션"
      className="neobrutal-profile-card w-full p-[16px] md:w-[80%] md:max-w-[480px] md:p-[24px] lg:w-[400px] lg:max-w-[400px] lg:p-[24px] mx-auto text-center flex flex-col items-center bg-[#FEF08A] rounded-[12px] border-[3px] border-black shadow-[6px_6px_0px_#000] text-black relative transition-all duration-200"
      style={{
        backgroundColor: '#FEF08A',
        border: '3px solid black',
        boxShadow: '6px 6px 0 black',
        borderRadius: '12px',
      }}
    >
      {/* 상단 컨트롤 바 (협업 뱃지 & 액션 버튼) */}
      <div className="w-full flex items-center justify-between mb-3 gap-2">
        {profile.isAvailableForHire ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[#86EFAC] text-black border-[2px] border-black shadow-[2px_2px_0px_#000] text-[11px] font-black">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>협업 가능</span>
          </div>
        ) : (
          <div />
        )}

        {/* Action Buttons: 공유, QR, 편집 */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={onShare}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-white hover:bg-zinc-100 text-black border-[2px] border-black shadow-[2px_2px_0px_#000] text-xs font-bold transition active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            title="공유하기"
          >
            <ShareIcon size={13} />
            <span className="hidden sm:inline">공유</span>
          </button>
          <button
            onClick={onOpenQr}
            className="p-1.5 rounded-[8px] bg-white hover:bg-zinc-100 text-black border-[2px] border-black shadow-[2px_2px_0px_#000] transition active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            title="QR 코드 보기"
          >
            <QrCodeIcon size={14} />
          </button>
          <button
            onClick={onOpenEdit}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-white hover:bg-zinc-100 text-black border-[2px] border-black shadow-[2px_2px_0px_#000] text-xs font-black transition active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            title="프로필 편집"
          >
            <EditIcon size={13} />
            <span>편집</span>
          </button>
        </div>
      </div>

      {/* [프로필 이미지 섹션]
          - 형태: 원형 (border-radius: 50%)
          - 크기: 120px x 120px
          - 테두리: 3px solid black
          - 하드 그림자: 4px 4px 0 black */}
      <div className="relative mb-3.5">
        <div
          className="neobrutal-profile-img-container w-[120px] h-[120px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-full border-[3px] border-black shadow-[4px_4px_0px_#000] overflow-hidden relative bg-white mx-auto"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '3px solid black',
            boxShadow: '4px 4px 0 black',
          }}
        >
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="120px"
            className="object-cover rounded-full"
            priority
          />
        </div>
        {/* Status indicator */}
        <span
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-[2px] border-black flex items-center justify-center shadow-[1px_1px_0px_#000]"
          title="활동 중"
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
        </span>
      </div>

      {/* 이름 & 영문명 & 인증 뱃지 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-1">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
          {profile.name}
        </h1>
        <span className="text-sm font-bold text-black/75">
          ({profile.englishName})
        </span>
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white border-[1.5px] border-black shadow-[1px_1px_0px_#000]"
          title="인증된 프로필"
        >
          <CheckIcon size={12} />
        </span>
      </div>

      {/* 핸들 & 헤드라인 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-black/90 mb-2.5">
        <span className="bg-black text-white px-2 py-0.5 rounded-[6px] font-mono text-xs font-extrabold shadow-[1px_1px_0px_#000]">
          @{profile.handle}
        </span>
        <span className="text-black font-black">•</span>
        <span className="text-black font-extrabold">{profile.headline}</span>
      </div>

      {/* 소속 & 위치 */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5 text-xs font-bold text-black">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white border-[2px] border-black shadow-[2px_2px_0px_#000]">
          <BuildingIcon size={13} className="text-black" />
          <span>
            {profile.organization} {profile.department}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white border-[2px] border-black shadow-[2px_2px_0px_#000]">
          <MapPinIcon size={13} className="text-black" />
          <span>{profile.location}</span>
        </div>
      </div>

      {/* 상태 메시지 */}
      {profile.statusMessage && (
        <div className="mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-white border-[2px] border-black text-xs font-black text-black shadow-[2px_2px_0px_#000]">
            <SparklesIcon size={13} className="text-amber-500" />
            <span>{profile.statusMessage}</span>
          </div>
        </div>
      )}

      {/* 소개글 (Bio) */}
      <p className="text-xs sm:text-sm font-semibold leading-relaxed text-black/90 max-w-sm mb-3">
        {profile.bio}
      </p>

      {/* 기술 스택 뱃지 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3.5">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-0.5 rounded-[8px] text-[11px] font-extrabold bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-100 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 소셜 링크 아이콘 바 */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
        {profile.socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-[8px] bg-white hover:bg-yellow-200 text-black border-[2px] border-black shadow-[2px_2px_0px_#000] transition active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:scale-105"
            title={social.label}
            aria-label={social.label}
          >
            {renderSocialIcon(social.platform)}
          </a>
        ))}
      </div>
    </section>
  );
}
