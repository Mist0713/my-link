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

export function AboutTab({ profile }: AboutTabProps) {
  const renderTimelineIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'award':
        return <StarIcon size={14} className="text-amber-500" />;
      case 'career':
        return <BriefcaseIcon size={14} className="text-blue-500" />;
      case 'education':
      case 'activity':
      default:
        return <GraduationCapIcon size={14} className="text-violet-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Bio Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <span>소개 및 지향점</span>
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
          {profile.bio}
        </p>

        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <MailIcon size={14} className="text-zinc-400" />
            <a href={`mailto:${profile.email}`} className="hover:underline">
              {profile.email}
            </a>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="font-mono">📞</span>
              <span>{profile.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <MapPinIcon size={14} className="text-zinc-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <GraduationCapIcon size={14} className="text-zinc-400" />
            <span>{profile.organization}</span>
          </div>
        </div>
      </div>

      {/* Experience & History Timeline */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-6">
          경력 및 히스토리
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
          {profile.timeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 flex items-center justify-center group-hover:scale-110 group-hover:border-violet-500 transition-all shadow-xs">
                {renderTimelineIcon(item.type)}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">
                    {item.year}
                  </span>
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {item.organization}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
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
