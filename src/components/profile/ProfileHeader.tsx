'use client';

import React from 'react';
import Image from 'next/image';
import { ProfileData } from '../../types/profile';
import { themeConfigs } from '../../utils/theme';
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

export function ProfileHeader({
  profile,
  onOpenEdit,
  onOpenQr,
  onShare,
}: ProfileHeaderProps) {
  const currentTheme = themeConfigs[profile.theme] || themeConfigs.violet;

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
    <div className="relative w-full rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl overflow-hidden transition-all duration-300">
      {/* Decorative Gradient Banner */}
      <div
        className={`h-36 sm:h-44 w-full bg-gradient-to-r ${currentTheme.gradientHeader} relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Floating Top-Right Action Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md text-xs font-medium transition shadow-xs active:scale-95"
            title="공유하기"
          >
            <ShareIcon size={14} />
            <span className="hidden sm:inline">공유</span>
          </button>
          <button
            onClick={onOpenQr}
            className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition shadow-xs active:scale-95"
            title="QR 코드 보기"
          >
            <QrCodeIcon size={15} />
          </button>
          <button
            onClick={onOpenEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 backdrop-blur-md text-xs font-semibold transition shadow-sm active:scale-95"
            title="프로필 편집"
          >
            <EditIcon size={13} />
            <span>편집</span>
          </button>
        </div>
      </div>

      {/* Main Profile Info Section */}
      <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
        {/* Avatar & Badges Container */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4">
          <div className="relative inline-block self-center sm:self-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-white dark:bg-zinc-900 shadow-2xl relative">
              <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-zinc-200 dark:bg-zinc-800">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 640px) 112px, 128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Status indicator */}
            <span
              className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-3 border-white dark:border-zinc-900 flex items-center justify-center shadow-sm"
              title="활동 중"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          {/* Availability Status Badge */}
          {profile.isAvailableForHire && (
            <div className="flex items-center justify-center sm:justify-start gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold self-center sm:self-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>커피챗 & 프로젝트 협업 가능</span>
            </div>
          )}
        </div>

        {/* Name, Handle & Headline */}
        <div className="text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {profile.name}
            </h1>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
              ({profile.englishName})
            </span>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white shadow-xs"
              title="인증된 프로필"
            >
              <CheckIcon size={12} />
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span className="text-violet-600 dark:text-violet-400 font-semibold font-mono">
              @{profile.handle}
            </span>
            <span>•</span>
            <span>{profile.headline}</span>
          </div>

          {/* Location & Organization */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <BuildingIcon size={14} className="text-zinc-400" />
              <span>
                {profile.organization} {profile.department}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon size={14} className="text-zinc-400" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Status Message */}
          {profile.statusMessage && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-700/60 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <SparklesIcon size={13} className="text-amber-500" />
                <span>{profile.statusMessage}</span>
              </div>
            </div>
          )}

          {/* Bio paragraph */}
          <p className="pt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-2xl">
            {profile.bio}
          </p>

          {/* Tech Skills Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social Links Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {profile.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition duration-150 shadow-xs hover:scale-105 active:scale-95"
                title={social.label}
                aria-label={social.label}
              >
                {renderSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
