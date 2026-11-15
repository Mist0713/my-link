'use client';

import React, { useState } from 'react';
import { LinkItem, ProfileData, ProfileTheme } from '../../types/profile';
import { themeConfigs } from '../../utils/theme';
import { CloseIcon, TrashIcon, CheckIcon } from '../icons/Icons';
import { AddLinkDialog } from './AddLinkDialog';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [activeTab, setActiveTab] = useState<'basic' | 'links' | 'theme'>('basic');

  if (!isOpen) return null;

  const handleInputChange = <K extends keyof ProfileData>(field: K, value: ProfileData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddLink = (newLink: LinkItem) => {
    setFormData((prev) => ({
      ...prev,
      links: [newLink, ...prev.links],
    }));
  };

  const handleDeleteLink = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((l) => l.id !== id),
    }));
  };

  const handleTogglePin = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.id === id ? { ...l, pinned: !l.pinned } : l
      ),
    }));
  };

  const handleSkillsChange = (text: string) => {
    const list = text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, skills: list }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E8EB]">
          <div>
            <h2 className="text-lg font-bold text-[#191F28]">
              프로필 편집
            </h2>
            <p className="text-xs text-[#8B95A1]">
              내 프로필 정보와 링크를 자유롭게 수정해 보세요
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8B95A1] hover:text-[#191F28] rounded-full hover:bg-[#F2F4F6] transition"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E5E8EB] px-6 gap-4 bg-[#F9FAFB]">
          <button
            onClick={() => setActiveTab('basic')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'basic'
                ? 'border-[#3182F6] text-[#3182F6]'
                : 'border-transparent text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            기본 정보
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'links'
                ? 'border-[#3182F6] text-[#3182F6]'
                : 'border-transparent text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            링크 관리 ({formData.links.length})
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'theme'
                ? 'border-[#3182F6] text-[#3182F6]'
                : 'border-transparent text-[#6B7684] hover:text-[#191F28]'
            }`}
          >
            테마 & 색상
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    영문 이름
                  </label>
                  <input
                    type="text"
                    value={formData.englishName}
                    onChange={(e) => handleInputChange('englishName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    핸들 (@아이디)
                  </label>
                  <input
                    type="text"
                    value={formData.handle}
                    onChange={(e) => handleInputChange('handle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    한 줄 소개 (Headline)
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    소속 기관 / 학교
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    학과 / 부서
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    거주 지역 / 활동지
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  상태 메시지 (배너 아래 표시)
                </label>
                <input
                  type="text"
                  value={formData.statusMessage || ''}
                  onChange={(e) => handleInputChange('statusMessage', e.target.value)}
                  placeholder="예: 🚀 사이드 프로젝트 팀원 모집 중!"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  상세 자기소개 (Bio)
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  기술 스택 (쉼표 , 로 구분)
                </label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  placeholder="Next.js, React, TypeScript, Tailwind"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="hireable"
                  checked={formData.isAvailableForHire}
                  onChange={(e) => handleInputChange('isAvailableForHire', e.target.checked)}
                  className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 border-zinc-300"
                />
                <label htmlFor="hireable" className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  커피챗 / 프로젝트 협업 가능 배지 표시
                </label>
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-[#E5E8EB] bg-[#F9FAFB] p-4">
                <div className="min-w-[180px] flex-1">
                  <h4 className="text-sm font-bold text-[#191F28]">링크 목록</h4>
                  <p className="mt-1 text-xs text-[#6B7684]">제목과 주소를 입력해 새 링크를 추가해요.</p>
                </div>
                <AddLinkDialog existingLinks={formData.links} onAdd={handleAddLink} />
              </div>

              {/* Current Links List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase">
                  등록된 링크 목록 ({formData.links.length})
                </h4>
                {formData.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                          {link.title}
                        </span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate">{link.url}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePin(link.id)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                          link.pinned
                            ? 'bg-amber-500 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        }`}
                        title="상단 고정 토글"
                      >
                        {link.pinned ? '고정됨' : '고정'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="삭제"
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-500">
                원하는 프로필 스타일과 그라데이션 배너 테마를 선택하세요:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(themeConfigs) as ProfileTheme[]).map((themeKey) => {
                  const cfg = themeConfigs[themeKey];
                  const isSelected = formData.theme === themeKey;
                  return (
                    <div
                      key={themeKey}
                      onClick={() => handleInputChange('theme', themeKey)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-950/20 shadow-xs'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradientHeader} shadow-sm`}
                        />
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          {cfg.name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                          <CheckIcon size={12} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E8EB] bg-[#F9FAFB]">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[#8B95A1] hover:text-[#191F28] underline"
          >
            기본값 복원
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[12px] text-xs font-semibold bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#191F28] transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-[12px] text-xs font-bold bg-[#3182F6] hover:bg-[#1B64DA] text-white shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              변경사항 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
