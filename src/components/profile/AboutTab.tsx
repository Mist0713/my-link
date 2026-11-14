'use client';

import React from 'react';
import { TimelineItem, ProfileData } from '../../types/profile';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  StarIcon,
} from '../icons/Icons';

interface AboutTabProps {
  profile: ProfileData;
}

/**
 * Toss Design System (TDS) 이력 및 소개 탭
 * - 깔끔한 20px 라운드 정보 카드
 * - 토스 블루 노드 포인트 기반 타임라인
 */
export function AboutTab({ profile }: AboutTabProps) {
  const renderTimelineIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'award':
        return <StarIcon size={13} className="text-[#3182F6]" />;
      case 'career':
        return <BriefcaseIcon size={13} className="text-[#3182F6]" />;
      case 'education':
      case 'activity':
      default:
        return <GraduationCapIcon size={13} className="text-[#3182F6]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Intro Bio Card */}
      <div className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#E5E8EB] shadow-[0_1px_3px_rgba(25,31,40,0.04)] space-y-3">
        <h3 className="text-base font-bold text-[#191F28] flex items-center gap-2">
          <span>소개 및 관심 분야</span>
        </h3>
        <p className="text-sm leading-relaxed text-[#4E5968] whitespace-pre-line">
          {profile.bio}
        </p>

        <div className="pt-3 border-t border-[#E5E8EB] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#4E5968]">
            <MailIcon size={14} className="text-[#8B95A1]" />
            <a href={`mailto:${profile.email}`} className="hover:text-[#3182F6] transition-colors">
              {profile.email}
            </a>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-2 text-[#4E5968]">
              <span className="font-mono text-[#8B95A1]">📞</span>
              <span>{profile.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-[#4E5968]">
            <MapPinIcon size={14} className="text-[#8B95A1]" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-[#4E5968]">
            <GraduationCapIcon size={14} className="text-[#8B95A1]" />
            <span>{profile.organization}</span>
          </div>
        </div>
      </div>

      {/* Experience & History Timeline */}
      <div className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#E5E8EB] shadow-[0_1px_3px_rgba(25,31,40,0.04)]">
        <h3 className="text-base font-bold text-[#191F28] mb-5">
          활동 및 수상 이력
        </h3>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E8EB]">
          {profile.timeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot Node */}
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-[#3182F6] flex items-center justify-center shadow-xs">
                {renderTimelineIcon(item.type)}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#3182F6] bg-[#E8F3FF] px-2 py-0.5 rounded-full">
                    {item.year}
                  </span>
                  <span className="text-xs text-[#8B95A1] font-medium">
                    {item.organization}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#191F28]">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-[#6B7684]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
