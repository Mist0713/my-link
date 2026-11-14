'use client';

import React, { useState, useEffect } from 'react';
import { ProfileData } from '../../types/profile';
import { initialProfileData } from '../../data/initialProfile';
import { ProfileHeader } from './ProfileHeader';
import { LinksTab } from './LinksTab';
import { ProjectsTab } from './ProjectsTab';
import { AboutTab } from './AboutTab';
import { GuestbookTab } from './GuestbookTab';
import { EditProfileModal } from './EditProfileModal';
import { QrCodeModal } from './QrCodeModal';
import { Toast } from './Toast';
import {
  GlobeIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MessageSquareIcon,
} from '../icons/Icons';

type TabType = 'links' | 'projects' | 'about' | 'guestbook';

interface ProfileContainerProps {
  initialData?: ProfileData;
}

export function ProfileContainer({ initialData = initialProfileData }: ProfileContainerProps) {
  const [profile, setProfile] = useState<ProfileData>(initialData);
  const [activeTab, setActiveTab] = useState<TabType>('links');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'responsive' | 'mobile'>('responsive');
  const [currentUrl, setCurrentUrl] = useState('https://my-link.dev/@jiwon.dev');

  // Load saved profile data from localStorage asynchronously to avoid render cascade
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentUrl(window.location.href);
      try {
        const saved = localStorage.getItem('mylink_profile_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          setProfile(parsed);
        }
      } catch {
        // ignore storage errors
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);
  };

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('mylink_profile_data', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast('프로필 정보가 저장되었습니다! 💾');
  };

  const handleResetProfile = () => {
    setProfile(initialProfileData);
    try {
      localStorage.removeItem('mylink_profile_data');
    } catch {
      // ignore
    }
    setIsEditOpen(false);
    showToast('기본 프로필로 초기화되었습니다 🔄');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      showToast('프로필 링크가 클립보드에 복사되었습니다! 📋');
    } catch {
      showToast('링크 주소: ' + currentUrl);
    }
  };

  const handleLinkClick = (id: string) => {
    setProfile((prev) => {
      const updatedLinks = prev.links.map((link) =>
        link.id === id ? { ...link, clicks: link.clicks + 1 } : link
      );
      const updated = { ...prev, links: updatedLinks };
      try {
        localStorage.setItem('mylink_profile_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6 transition-colors duration-300">
      {/* Top Bar for View Controls & Branding */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
            ML
          </div>
          <span className="font-extrabold tracking-tight text-sm text-zinc-900 dark:text-white">
            My-Link
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
            HYU
          </span>
        </div>

        {/* View Mode Switcher (Desktop card vs Mobile frame) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800 text-xs">
          <button
            onClick={() => setViewMode('responsive')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'responsive'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            기본 뷰
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'mobile'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            📱 모바일 프레임
          </button>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-md border-8 border-zinc-800 rounded-[44px] shadow-2xl p-2 bg-zinc-900 overflow-hidden my-4 ring-1 ring-zinc-700/50'
            : 'max-w-2xl'
        }`}
      >
        <div className="w-full space-y-6">
          {/* Profile Header */}
          <ProfileHeader
            profile={profile}
            onOpenEdit={() => setIsEditOpen(true)}
            onOpenQr={() => setIsQrOpen(true)}
            onShare={handleCopyLink}
          />

          {/* Navigation Tabs */}
          <nav className="flex items-center p-1 rounded-2xl bg-zinc-200/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'links'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <GlobeIcon size={15} />
              <span>링크</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-normal">
                {profile.links.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'projects'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <BriefcaseIcon size={15} />
              <span>프로젝트</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-normal">
                {profile.projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'about'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <GraduationCapIcon size={15} />
              <span>소개/이력</span>
            </button>

            <button
              onClick={() => setActiveTab('guestbook')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'guestbook'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <MessageSquareIcon size={15} />
              <span>방명록</span>
            </button>
          </nav>

          {/* Tab Content Display */}
          <div className="pt-1">
            {activeTab === 'links' && (
              <LinksTab
                links={profile.links}
                theme={profile.theme}
                onLinkClick={handleLinkClick}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab
                projects={profile.projects}
                theme={profile.theme}
              />
            )}
            {activeTab === 'about' && (
              <AboutTab profile={profile} />
            )}
            {activeTab === 'guestbook' && (
              <GuestbookTab
                theme={profile.theme}
                onToast={showToast}
              />
            )}
          </div>

          {/* Footer Branding */}
          <footer className="pt-8 pb-4 text-center text-xs text-zinc-400 space-y-1">
            <p className="font-medium">
              Made with <span className="text-rose-500">♥</span> on{' '}
              <span className="font-bold text-zinc-600 dark:text-zinc-300">
                My-Link
              </span>
            </p>
            <p className="text-[11px] text-zinc-400">
              한양대학교 학생 및 크리에이터를 위한 스마트 바이오링크
            </p>
          </footer>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={currentUrl}
        name={profile.name}
        handle={profile.handle}
        onCopy={handleCopyLink}
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} visible={isToastVisible} />
    </div>
  );
}
