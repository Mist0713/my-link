'use client';

import React from 'react';
import { ProjectItem, ProfileTheme } from '../../types/profile';
import { themeConfigs } from '../../utils/theme';
import { ExternalLinkIcon, GithubIcon, StarIcon } from '../icons/Icons';

interface ProjectsTabProps {
  projects: ProjectItem[];
  theme: ProfileTheme;
}

export function ProjectsTab({ projects, theme }: ProjectsTabProps) {
  const currentTheme = themeConfigs[theme] || themeConfigs.violet;

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-400">
        <p className="text-sm">등록된 프로젝트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all duration-200 ${currentTheme.cardHover} hover:shadow-md relative`}
        >
          {project.highlight && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 mb-2.5">
              <StarIcon size={12} />
              <span>대표 프로젝트</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              {project.role && (
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
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
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition shadow-xs"
                >
                  <span>서비스 방문</span>
                  <ExternalLinkIcon size={13} />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono"
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
