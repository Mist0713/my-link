'use client';

import { useState, type FormEvent } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { LinkItem } from '../../types/profile';
import { CloseIcon, PlusIcon } from '../icons/Icons';

interface AddLinkDialogProps {
  existingLinks: LinkItem[];
  onAdd: (link: LinkItem) => void;
}

const categories: { value: LinkItem['category']; label: string }[] = [
  { value: 'social', label: '소셜' },
  { value: 'project', label: '프로젝트' },
  { value: 'blog', label: '블로그' },
  { value: 'work', label: '포트폴리오·업무' },
  { value: 'contact', label: '연락처' },
  { value: 'etc', label: '기타' },
];

const fieldClassName =
  'w-full rounded-[12px] border border-[#E5E8EB] bg-white px-3.5 py-3 text-sm text-[#191F28] outline-none transition placeholder:text-[#8B95A1] focus:border-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/15';

function normalizeUrl(value: string): { url?: string; error?: string } {
  const input = value.trim();
  if (!input) return { error: '링크 주소를 입력해 주세요.' };
  if (input.length > 2048) return { error: 'URL은 2,048자 이내로 입력해 주세요.' };

  const schemeMatch = input.match(/^([a-z][a-z\d+.-]*):/i);
  const isLocalhostPort = Boolean(schemeMatch && /^\d+(?:\/|$)/.test(input.slice(schemeMatch[0].length)));
  const hasScheme = /^(https?:\/\/|mailto:)/i.test(input);
  if (schemeMatch && !hasScheme && !isLocalhostPort) {
    return { error: 'http, https 또는 mailto 주소만 사용할 수 있어요.' };
  }

  const candidate = hasScheme ? input : `https://${input}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'mailto:') {
      const address = parsed.pathname;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
        return { error: '올바른 이메일 주소를 입력해 주세요.' };
      }
      return { url: `mailto:${address}${parsed.search}${parsed.hash}` };
    }

    if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) {
      return { error: '올바른 웹 주소를 입력해 주세요.' };
    }

    if (!isValidWebHost(parsed.hostname)) {
      return { error: '도메인까지 입력해 주세요. 예: example.com' };
    }

    const normalized = parsed.href;
    return { url: parsed.pathname === '/' && !parsed.search && !parsed.hash ? normalized.replace(/\/$/, '') : normalized };
  } catch {
    return { error: '올바른 웹 주소 또는 mailto 주소를 입력해 주세요.' };
  }
}

function isValidWebHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === 'localhost') return true;
  if (/^\[[0-9a-f:.]+\]$/i.test(host)) return true;

  const ipv4Parts = host.split('.');
  if (
    ipv4Parts.length === 4 &&
    ipv4Parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
  ) {
    return true;
  }

  const domain = host.endsWith('.') ? host.slice(0, -1) : host;
  const labels = domain.split('.');
  if (labels.length < 2) return false;

  return labels.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
  ) && (labels.at(-1)?.length ?? 0) >= 2;
}

function getComparableUrl(value: string): string | undefined {
  const normalized = normalizeUrl(value);
  return normalized.url?.toLowerCase();
}

export function AddLinkDialog({ existingLinks, onAdd }: AddLinkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<LinkItem['category']>('etc');
  const [badge, setBadge] = useState('');
  const [pinned, setPinned] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [urlError, setUrlError] = useState('');

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('etc');
    setBadge('');
    setPinned(false);
    setTitleError('');
    setUrlError('');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) resetForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const nextTitleError = !trimmedTitle
      ? '링크 제목을 입력해 주세요.'
      : trimmedTitle.length > 60
        ? '링크 제목은 60자 이내로 입력해 주세요.'
        : '';
    setTitleError(nextTitleError);

    const normalizedUrl = normalizeUrl(url);
    let nextUrlError = normalizedUrl.error || '';
    if (normalizedUrl.url) {
      const candidate = getComparableUrl(normalizedUrl.url);
      const duplicate = Boolean(candidate) && existingLinks.some((link) => getComparableUrl(link.url) === candidate);
      if (duplicate) nextUrlError = '이미 등록된 주소예요. 다른 URL을 입력해 주세요.';
    }
    setUrlError(nextUrlError);

    const validCategory = categories.some((option) => option.value === category);
    if (!validCategory) return;
    if (nextTitleError || nextUrlError || !normalizedUrl.url) return;

    onAdd({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      url: normalizedUrl.url,
      description: description.trim() || undefined,
      category,
      badge: badge.trim() || undefined,
      clicks: 0,
      pinned,
    });
    handleOpenChange(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] bg-[#3182F6] px-4 text-sm font-bold text-white shadow-[0_2px_8px_rgba(49,130,246,0.2)] transition hover:bg-[#1B64DA] active:scale-[0.98]">
        <PlusIcon size={16} />
        <span>링크 추가</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-[#191F28]/40 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[61] max-h-[min(90vh,720px)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[24px] border border-[#E5E8EB] bg-white text-[#191F28] shadow-[0_16px_48px_rgba(25,31,40,0.2)] outline-none data-[ending-style]:scale-[0.98] data-[starting-style]:scale-[0.98]">
          <div className="flex items-start justify-between gap-4 border-b border-[#E5E8EB] px-5 py-5 sm:px-6">
            <div>
              <Dialog.Title className="text-lg font-bold tracking-tight text-[#191F28]">
                새 링크 추가
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm leading-5 text-[#6B7684]">
                프로필에 보여줄 링크 정보를 입력해 주세요.
              </Dialog.Description>
            </div>
            <Dialog.Close
              type="button"
              aria-label="닫기"
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#6B7684] transition hover:bg-[#F2F4F6] hover:text-[#191F28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6]"
            >
              <CloseIcon size={18} />
            </Dialog.Close>
          </div>

          <form noValidate onSubmit={handleSubmit} className="space-y-4 px-5 py-5 sm:px-6">
            <div className="space-y-1.5">
              <label htmlFor="new-link-title" className="text-sm font-semibold text-[#333D4B]">
                링크 제목 <span className="text-[#3182F6]">*</span>
              </label>
              <input
                id="new-link-title"
                autoFocus
                maxLength={60}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setTitleError('');
                }}
                aria-invalid={Boolean(titleError)}
                aria-describedby={titleError ? 'new-link-title-error' : undefined}
                placeholder="예: 개인 포트폴리오"
                className={`${fieldClassName} ${titleError ? 'border-[#F04452] focus:border-[#F04452] focus:ring-[#F04452]/15' : ''}`}
              />
              {titleError && <p id="new-link-title-error" className="text-xs text-[#D92D3A]">{titleError}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="new-link-url" className="text-sm font-semibold text-[#333D4B]">
                URL <span className="text-[#3182F6]">*</span>
              </label>
              <input
                id="new-link-url"
                maxLength={2048}
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setUrlError('');
                }}
                placeholder="https://example.com 또는 mailto:hello@example.com"
                aria-invalid={Boolean(urlError)}
                aria-describedby={urlError ? 'new-link-url-error' : 'new-link-url-hint'}
                className={`${fieldClassName} ${urlError ? 'border-[#F04452] focus:border-[#F04452] focus:ring-[#F04452]/15' : ''}`}
              />
              <p
                id={urlError ? 'new-link-url-error' : 'new-link-url-hint'}
                className={`text-xs ${urlError ? 'text-[#D92D3A]' : 'text-[#8B95A1]'}`}
              >
                {urlError || 'https://를 생략하면 자동으로 붙여 드려요.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="new-link-category" className="text-sm font-semibold text-[#333D4B]">
                  카테고리
                </label>
                <select
                  id="new-link-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value as LinkItem['category'])}
                  className={fieldClassName}
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="new-link-badge" className="text-sm font-semibold text-[#333D4B]">
                  배지 <span className="font-normal text-[#8B95A1]">(선택)</span>
                </label>
                <input
                  id="new-link-badge"
                  maxLength={24}
                  value={badge}
                  onChange={(event) => setBadge(event.target.value)}
                  placeholder="예: NEW"
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="new-link-description" className="text-sm font-semibold text-[#333D4B]">
                설명 <span className="font-normal text-[#8B95A1]">(선택)</span>
              </label>
              <textarea
                id="new-link-description"
                rows={3}
                maxLength={160}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="링크에 대한 짧은 설명을 적어 주세요."
                className={`${fieldClassName} resize-y`}
              />
            </div>

            <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[14px] bg-[#F9FAFB] px-3.5 py-2.5 text-sm text-[#4E5968]">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(event) => setPinned(event.target.checked)}
                className="size-4 accent-[#3182F6]"
              />
              <span>링크 목록 상단에 고정</span>
            </label>

            <div className="flex justify-end gap-2 border-t border-[#E5E8EB] pt-4">
              <Dialog.Close type="button" className="min-h-[44px] rounded-[12px] bg-[#F2F4F6] px-4 text-sm font-semibold text-[#333D4B] transition hover:bg-[#E5E8EB]">
                취소
              </Dialog.Close>
              <button
                type="submit"
                className="min-h-[44px] rounded-[12px] bg-[#3182F6] px-5 text-sm font-bold text-white transition hover:bg-[#1B64DA] active:scale-[0.98]"
              >
                링크 추가하기
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
