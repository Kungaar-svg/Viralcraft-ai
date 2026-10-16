import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ViralCraft AI",
  description: "Free AI Video Generator for YouTube Shorts",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, fontFamily:'sans-serif'}}>{children}</body>
    </html>
  );
}
