import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "ViralCraft AI - Turn Any Idea Into Viral Video",
  description: "Create viral TikTok, Reels & Shorts videos with AI. Free online video generator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Code - اپنا AdSense ID یہاں لگائیں جب مل جائے */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body style={{background:"#08080a", color:"white", margin:0}}>
        <Header />
        <main style={{minHeight:"80vh"}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
