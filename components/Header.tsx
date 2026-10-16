"use client";
import Link from "next/link";
export default function Header() {
  return (
    <header style={{padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #1a1a1e", position:"sticky", top:0, background:"rgba(8,8,10,0.8)", backdropFilter:"blur(10px)", zIndex:50}}>
      <Link href="/" style={{textDecoration:"none", color:"white", fontWeight:900, fontSize:"20px", letterSpacing:"1px"}}>VIRALCRAFT<span style={{color:"#7c3aed"}}>.AI</span></Link>
      <nav style={{display:"flex", gap:"20px", fontSize:"14px"}}>
        <Link href="/about" style={{color:"#888", textDecoration:"none"}}>About</Link>
        <Link href="/contact" style={{color:"#888", textDecoration:"none"}}>Contact</Link>
        <Link href="/privacy" style={{color:"#888", textDecoration:"none"}}>Privacy</Link>
      </nav>
    </header>
  );
}
