"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{background:'#0a0a0a', color:'white', minHeight:'100vh', padding:'20px'}}>
      <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center', paddingTop:'60px'}}>
        <h1 style={{fontSize:'48px', fontWeight:'bold'}}>ViralCraft AI</h1>
        <p style={{color:'#aaa', marginTop:'10px'}}>Free AI Video Generator for YouTube Shorts, TikTok & Reels - Powered by Gemini Veo 3</p>
        
        <div style={{background:'#1a1a1a', padding:'30px', borderRadius:'20px', marginTop:'40px'}}>
          <input 
            value={topic}
            onChange={(e)=>setTopic(e.target.value)}
            placeholder="Enter your topic: e.g. 'USA Horror Story'"
            style={{width:'100%', padding:'15px', borderRadius:'10px', background:'#222', color:'white', border:'1px solid #333'}}
          />
          <button 
            onClick={()=>setLoading(true)}
            style={{width:'100%', marginTop:'15px', padding:'15px', background:'#fff', color:'#000', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>
            {loading ? "Generating..." : "Generate Viral Video"}
          </button>
          {loading && <p style={{marginTop:'20px', color:'#0f0'}}>Your Gemini API will generate video here. Connect to Vercel next!</p>}
        </div>
        <p style={{marginTop:'30px', color:'#666'}}>Made for USA Audience | Free Forever</p>
      </div>
    </div>
  );
}
