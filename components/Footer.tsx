import Link from "next/link";
export default function Footer() {
  return (
    <footer style={{borderTop:"1px solid #1a1a1e", padding:"40px", marginTop:"60px", color:"#555"}}>
      <div style={{maxWidth:"1100px", margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"20px"}}>
        <div>
          <b style={{color:"white"}}>VIRALCRAFT.AI</b>
          <p style={{maxWidth:"300px", fontSize:"13px", marginTop:"8px"}}>The best free AI tool to create viral videos for TikTok, Instagram Reels and YouTube Shorts.</p>
        </div>
        <div style={{display:"flex", gap:"40px", fontSize:"13px"}}>
          <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <b style={{color:"white"}}>Company</b>
            <Link href="/about" style={{color:"#888", textDecoration:"none"}}>About Us</Link>
            <Link href="/contact" style={{color:"#888", textDecoration:"none"}}>Contact Us</Link>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <b style={{color:"white"}}>Legal</b>
            <Link href="/privacy" style={{color:"#888", textDecoration:"none"}}>Privacy Policy</Link>
            <Link href="/terms" style={{color:"#888", textDecoration:"none"}}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <p style={{textAlign:"center", marginTop:"40px", fontSize:"12px"}}>© 2026 ViralCraft AI. All rights reserved.</p>
    </footer>
  );
}
