"use client";
import { useState } from "react";
export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) return alert("Please enter idea");
    setLoading(true); setVideoUrl(""); setStatus("Generating...");
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-001:predictLongRunning?key=${apiKey}`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({instances:[{prompt}], parameters:{aspectRatio:"9:16", durationSeconds:8}})
      });
      const data = await res.json();
      if(data.error) throw new Error(data.error.message);
      let op = data.name; let uri = "";
      while(true){
        await new Promise(r=>setTimeout(r,6000));
        const poll = await fetch(`https://generativelanguage.googleapis.com/v1beta/${op}?key=${apiKey}`);
        const pData = await poll.json();
        if(pData.done){ uri = pData.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri; break; }
        setStatus("Processing...");
      }
      const vRes = await fetch(`${uri}&key=${apiKey}`);
      const blob = await vRes.blob();
      setVideoUrl(URL.createObjectURL(blob));
      setStatus("Ready!");
    } catch(e:any){ alert(e.message); setStatus(""); }
    setLoading(false);
  }

  return (
    <div style={{maxWidth:"750px", margin:"40px auto", textAlign:"center", padding:"0 20px"}}>
      <h1 style={{fontSize:"52px", fontWeight:800, lineHeight:"1.05"}}>Turn Any Idea Into<br/>Viral Video</h1>
      <p style={{color:"#888", margin:"16px 0 32px"}}>Built for TikTok, Reels & Shorts • 9:16 • Ultra Realistic</p>
      
      {/* AdSense Ad Spot - Top */}
      <div style={{background:"#111", border:"1px dashed #222", height:"90px", display:"flex", alignItems:"center", justifyContent:"center", color:"#444", fontSize:"12px", borderRadius:"12px", marginBottom:"20px"}}>AdSense Ad Will Appear Here</div>

      <div style={{background:"#141416", border:"1px solid #232326", borderRadius:"24px", padding:"24px"}}>
        <div style={{display:"flex", gap:"12px", background:"#0a0a0c", border:"1px solid #232326", borderRadius:"16px", padding:"8px"}}>
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. Ramadan night cinematic..." style={{flex:1, background:"transparent", border:"none", outline:"none", color:"white", padding:"12px"}} />
          <button onClick={generateVideo} disabled={loading} style={{background:"white", color:"black", border:"none", padding:"14px 28px", borderRadius:"12px", fontWeight:700, cursor:"pointer"}}>{loading?"...":"Generate ✨"}</button>
        </div>
        {status && <p style={{marginTop:"16px", color:"#a78bfa"}}>{status}</p>}
        {videoUrl && <video src={videoUrl} controls autoPlay loop playsInline style={{width:"100%", marginTop:"20px", borderRadius:"16px"}} />}
      </div>

      {/* AdSense Ad Spot - Bottom */}
      <div style={{background:"#111", border:"1px dashed #222", height:"250px", display:"flex", alignItems:"center", justifyContent:"center", color:"#444", fontSize:"12px", borderRadius:"12px", marginTop:"20px"}}>AdSense Ad Will Appear Here</div>
    </div>
  );
}
