import { ProfileTheme } from '../types/profile';

export interface ThemeConfig {
  name: string;
  gradientHeader: string;
  badgeBg: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  buttonGradient: string;
  cardHover: string;
  glowColor: string;
}

export const themeConfigs: Record<ProfileTheme, ThemeConfig> = {
  violet: {
    name: '바이올렛 (Violet)',
    gradientHeader: 'from-violet-600 via-purple-600 to-indigo-700',
    badgeBg: 'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300',
    accentText: 'text-violet-600 dark:text-violet-400',
    accentBg: 'bg-violet-600 hover:bg-violet-700 text-white',
    accentBorder: 'border-violet-300 dark:border-violet-800',
    buttonGradient: 'from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700',
    cardHover: 'hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-violet-500/10',
    glowColor: 'rgba(139, 92, 246, 0.25)',
  },
  sunset: {
    name: '선셋 (Sunset)',
    gradientHeader: 'from-rose-500 via-orange-500 to-amber-500',
    badgeBg: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
    accentText: 'text-orange-600 dark:text-orange-400',
    accentBg: 'bg-orange-500 hover:bg-orange-600 text-white',
    accentBorder: 'border-orange-300 dark:border-orange-800',
    buttonGradient: 'from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600',
    cardHover: 'hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-orange-500/10',
    glowColor: 'rgba(249, 115, 22, 0.25)',
  },
  emerald: {
    name: '에메랄드 (Emerald)',
    gradientHeader: 'from-emerald-600 via-teal-600 to-cyan-700',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    accentBorder: 'border-emerald-300 dark:border-emerald-800',
    buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
    cardHover: 'hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-emerald-500/10',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
  modern: {
    name: '모던 블루 (Modern Blue)',
    gradientHeader: 'from-blue-600 via-sky-600 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    accentText: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    accentBorder: 'border-blue-300 dark:border-blue-800',
    buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    cardHover: 'hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-blue-500/10',
    glowColor: 'rgba(59, 130, 246, 0.25)',
  },
  dark: {
    name: '미드나잇 다크 (Midnight Dark)',
    gradientHeader: 'from-zinc-900 via-neutral-900 to-stone-900',
    badgeBg: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    accentText: 'text-zinc-100 dark:text-zinc-100',
    accentBg: 'bg-zinc-800 hover:bg-zinc-700 text-white',
    accentBorder: 'border-zinc-700 dark:border-zinc-600',
    buttonGradient: 'from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800',
    cardHover: 'hover:border-zinc-500 hover:shadow-zinc-500/10',
    glowColor: 'rgba(255, 255, 255, 0.1)',
  },
  clean: {
    name: '클린 미니멀 (Clean Minimal)',
    gradientHeader: 'from-slate-200 via-gray-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-850 dark:to-zinc-900',
    badgeBg: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
    accentText: 'text-zinc-900 dark:text-zinc-100',
    accentBg: 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black',
    accentBorder: 'border-zinc-300 dark:border-zinc-700',
    buttonGradient: 'from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-900 dark:from-white dark:to-zinc-200 dark:text-black',
    cardHover: 'hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-zinc-400/10',
    glowColor: 'rgba(0, 0, 0, 0.1)',
  },
};
