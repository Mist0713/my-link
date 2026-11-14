import { Metadata } from 'next';
import { ProfileContainer } from '../components/profile/ProfileContainer';

export const metadata: Metadata = {
  title: '이지원 | My-Link (Toss Design System)',
  description: '토스 디자인 시스템(TDS) 기반의 스마트 바이오링크 & 프로필',
};

/**
 * Toss Design System (TDS) 프로필 페이지
 * - 색상: 화이트 캔버스 (#FFFFFF) + greyBackground (#F2F4F6) + canonical Toss Blue (#3182F6)
 * - 타이포그래피: Pretendard 기반의 TDS 타이포 램프 및 tabular-nums
 * - 보이스 & 톤: 유능하고 친절한 해요체 ("~해요", "~있어요")
 * - 컴포넌트: ListRow, 24px 라운드 카드, 44px 아이콘 슬롯, TDS 버튼 위계
 */

export default function Home() {
  return <ProfileContainer />;
}
