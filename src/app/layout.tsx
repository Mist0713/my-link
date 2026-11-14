import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My-Link | 스마트 바이오링크 & 프로필",
  description: "나만의 멋진 링크와 포트폴리오를 한곳에서 공유하는 My-Link 프로필",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
