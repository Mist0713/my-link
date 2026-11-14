import { Metadata } from 'next';
import { ProfileContainer } from '../../components/profile/ProfileContainer';

export const metadata: Metadata = {
  title: '이지원 (Ji-won Lee) | My-Link 프로필',
  description: '소프트웨어 엔지니어 & UI/UX 빌더 이지원의 My-Link 프로필 & 포트폴리오',
};

export default function ProfilePage() {
  return <ProfileContainer />;
}
