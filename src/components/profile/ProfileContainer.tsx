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
    showToast('프로필 정보가 저장되었어요 💾');
  };

  const handleResetProfile = () => {
    setProfile(initialProfileData);
    try {
      localStorage.removeItem('mylink_profile_data');
    } catch {
      // ignore
    }
    setIsEditOpen(false);
    showToast('기본 프로필로 초기화되었어요 🔄');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      showToast('프로필 링크가 복사되었어요 📋');
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
    <div className="min-h-screen bg-[#F2F4F6] text-[#191F28] flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6 transition-colors duration-300">
      {/* TDS Top Navigation Bar */}
      <header className="w-full max-w-md flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[10px] bg-[#3182F6] flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
            ML
          </div>
          <span className="font-extrabold tracking-tight text-sm text-[#191F28]">
            My-Link
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-[6px] bg-[#E5E8EB] text-[#4E5968] font-mono">
            HYU
          </span>
        </div>

        {/* View Mode Switcher (TDS Segmented-Control) */}
        <div className="flex items-center gap-1 p-1 rounded-[12px] bg-[#E5E8EB] text-xs">
          <button
            onClick={() => setViewMode('responsive')}
            className={`px-3 py-1 rounded-[8px] font-semibold transition ${
              viewMode === 'responsive'
                ? 'bg-white text-[#191F28] shadow-[0_1px_2px_rgba(25,31,40,0.06)]'
                : 'text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            기본 뷰
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-[8px] font-semibold transition ${
              viewMode === 'mobile'
                ? 'bg-white text-[#191F28] shadow-[0_1px_2px_rgba(25,31,40,0.06)]'
                : 'text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            📱 모바일 프레임
          </button>
        </div>
      </header>

      {/* Main Container Wrapper (TDS Mobile-First Single Column) */}
      <main
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-md border-[6px] border-[#333D4B] rounded-[44px] shadow-2xl p-2 bg-[#F2F4F6] overflow-hidden my-4 ring-1 ring-black/10'
            : 'max-w-md'
        }`}
      >
        <div className="w-full space-y-4">
          {/* Profile Header (TDS Card) */}
          <ProfileHeader
            profile={profile}
            onOpenEdit={() => setIsEditOpen(true)}
            onOpenQr={() => setIsQrOpen(true)}
            onShare={handleCopyLink}
          />

          {/* Floating Navigation Tabs (TDS Floating Tab-Bar) */}
          <nav className="flex items-center p-1.5 rounded-[20px] bg-white border border-[#E5E8EB] shadow-[0_2px_8px_rgba(25,31,40,0.04)]">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-2.5 px-2 rounded-[14px] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'links'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
            >
              <GlobeIcon size={15} />
              <span>링크</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                activeTab === 'links' ? 'bg-[#3182F6]/10 text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'
              }`}>
                {profile.links.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-2.5 px-2 rounded-[14px] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
            >
              <BriefcaseIcon size={15} />
              <span>프로젝트</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                activeTab === 'projects' ? 'bg-[#3182F6]/10 text-[#3182F6]' : 'bg-[#F2F4F6] text-[#8B95A1]'
              }`}>
                {profile.projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-2.5 px-2 rounded-[14px] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'about'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
            >
              <GraduationCapIcon size={15} />
              <span>소개/이력</span>
            </button>

            <button
              onClick={() => setActiveTab('guestbook')}
              className={`flex-1 py-2.5 px-2 rounded-[14px] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'guestbook'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#6B7684] hover:text-[#191F28]'
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

          {/* Footer Branding (TDS 해요체) */}
          <footer className="pt-8 pb-4 text-center text-xs text-[#8B95A1] space-y-1">
            <p className="font-medium text-[#6B7684]">
              토스 디자인 시스템(TDS) 스타일로 구성되었어요
            </p>
            <p className="text-[11px] text-[#8B95A1]">
              한양대학교 학생 및 크리에이터를 위한 스마트 바이오링크예요
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
