import { Metadata } from 'next';
import { ProfileContainer } from '../components/profile/ProfileContainer';

export const metadata: Metadata = {
  title: 'My-Link | 스마트 바이오링크 & 프로필',
  description: '나만의 멋진 링크와 포트폴리오를 한곳에서 공유하는 My-Link 프로필',
};

export default function Home() {
  return <ProfileContainer />;
}
