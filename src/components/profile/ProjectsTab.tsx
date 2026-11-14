'use client';

import React from 'react';
import { ProjectItem, ProfileTheme } from '../../types/profile';
import { ExternalLinkIcon, GithubIcon, StarIcon } from '../icons/Icons';

interface ProjectsTabProps {
  projects: ProjectItem[];
  theme: ProfileTheme;
}

/**
 * Toss Design System (TDS) 프로젝트 카드 탭
 * - 20px 라운드 화이트 표면 (radius-2xl) + 1px 헤어라인 보더
 * - 단일 강조색 토스 블루 액션 버튼
 * - 깔끔한 태그 칩 및 대표 프로젝트 뱃지
 */
export function ProjectsTab({ projects }: ProjectsTabProps) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-[#8B95A1] bg-white rounded-[20px] border border-[#E5E8EB] p-8">
        <p className="text-sm font-semibold text-[#4E5968]">등록된 프로젝트가 아직 없어요</p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="p-5 rounded-[20px] bg-white border border-[#E5E8EB] hover:border-[#3182F6]/40 shadow-[0_1px_3px_rgba(25,31,40,0.04)] hover:shadow-[0_4px_16px_rgba(49,130,246,0.06)] transition-all duration-150 relative"
        >
          {project.highlight && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F3FF] text-[#3182F6] mb-2.5">
              <StarIcon size={12} />
              <span>대표 프로젝트</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#191F28]">
                {project.title}
              </h3>
              {project.role && (
                <p className="text-xs font-medium text-[#6B7684] mt-0.5">
                  {project.role} {project.period && `• ${project.period}`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center mt-1 sm:mt-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[12px] bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#4E5968] hover:text-[#191F28] flex items-center justify-center transition active:scale-95"
                  title="GitHub 저장소 보기"
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-[#3182F6] hover:bg-[#1B64DA] text-white text-xs font-bold transition shadow-xs active:scale-95"
                >
                  <span>방문하기</span>
                  <ExternalLinkIcon size={13} />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-[#4E5968] leading-relaxed mb-3.5 whitespace-pre-line">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-[8px] text-xs font-medium bg-[#F2F4F6] text-[#4E5968] font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
