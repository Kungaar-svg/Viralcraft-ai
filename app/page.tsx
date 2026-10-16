"use client";
import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");

  async function generate() {
    if (!prompt) return alert("Please enter your idea first");
    setLoading(true);
    setVideo("");
    try {
      const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      // Demo video - real video needs Veo billing
      setVideo("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{minHeight:"100vh", background:"#08080a", color:"white"}}>
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"20px", display:"flex", justifyContent:"space-between"}}>
        <div style={{fontWeight:900, fontSize:"20px"}}>VIRALCRAFT<span style={{color:"#7c3aed"}}>.AI</span></div>
        <div style={{background:"#1a1a1e", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>PRO • ONLINE</div>
      </div>

      <div style={{maxWidth:"800px", margin:"60px auto", textAlign:"center", padding:"0 20px"}}>
        <h1 style={{fontSize:"52px", fontWeight:800, lineHeight:"1.1", marginBottom:"16px"}}>Turn Any Idea Into<br/>Viral Video</h1>
        <p style={{color:"#888", marginBottom:"40px"}}>Built for TikTok, Reels & Shorts • 9:16 • Ultra Realistic</p>

        <div style={{background:"#141416", border:"1px solid #232326", borderRadius:"24px", padding:"24px"}}>
          <div style={{display:"flex", gap:"12px", background:"#0c0c0e", border:"1px solid #232326", borderRadius:"16px", padding:"8px"}}>
            <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. Ramadan night, a boy looking at moon..." style={{flex:1, background:"transparent", border:"none", outline:"none", color:"white", padding:"12px"}} />
            <button onClick={generate} disabled={loading} style={{background:"white", color:"black", border:"none", padding:"14px 28px", borderRadius:"12px", fontWeight:700, cursor:"pointer"}}>{loading ? "Generating..." : "Generate Video ✨"}</button>
          </div>

          {video && (
            <div style={{marginTop:"24px"}}>
              <video src={video} controls autoPlay loop style={{width:"100%", borderRadius:"16px", maxHeight:"600px", background:"black"}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
