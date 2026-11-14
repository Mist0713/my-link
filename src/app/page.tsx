import { Metadata } from 'next';
import { ProfileContainer } from '../components/profile/ProfileContainer';
import { ProfileHeader } from '../components/profile/ProfileHeader';

export const metadata: Metadata = {
  title: 'My-Link | 스마트 바이오링크 & 프로필',
  description: '나만의 멋진 링크와 포트폴리오를 한곳에서 공유하는 My-Link 프로필',
};

/**
 * [Neobrutalism 스타일 가이드]
 * - 굵은 검은 테두리: 3px solid black
 * - 하드 그림자: 6px 6px 0 black (블러 없음)
 * - 배경색: 밝은 노란색 (#FEF08A)
 * - 둥근 모서리: 12px
 *
 * [프로필 카드]
 * - 위 스타일 적용 (border: 3px solid black, box-shadow: 6px 6px 0 black, background: #FEF08A, border-radius: 12px)
 * - 패딩: 24px, 중앙 정렬
 *
 * [프로필 이미지]
 * - 형태: 원형 (border-radius: 50%)
 * - 크기: 120px x 120px
 * - 테두리: 3px solid black
 * - 하드 그림자: 4px 4px 0 black
 *
 * [반응형]
 * - 모바일 (360px~767px): 카드 너비 100%, 패딩 16px
 * - 태블릿 (768px~1023px): 카드 너비 80%, 최대 480px
 * - 데스크탑 (1024px~): 카드 너비 400px 고정
 */

export { ProfileHeader };

export default function Home() {
  return <ProfileContainer />;
}
