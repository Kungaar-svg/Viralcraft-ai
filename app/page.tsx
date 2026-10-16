"use client";
import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) {
      alert("Please enter your idea first");
      return;
    }

    setLoading(true);
    setVideoUrl("");
    setStatus("Starting generation...");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key not found. Add it in Vercel Environment Variables.");

      // Step 1: Enhance prompt with Gemini (hidden from frontend)
      setStatus("Creating viral style...");
      const enhanceRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Convert this into a detailed 8 second vertical 9:16 cinematic viral video prompt, ultra realistic, trending TikTok style: ${prompt}` }] }],
          }),
        }
      );
      const enhanceData = await enhanceRes.json();
      const finalPrompt = enhanceData.candidates?.[0]?.content?.parts?.[0]?.text || prompt;

      // Step 2: Start Veo 3 generation
      setStatus("Generating video... This can take 60-90 seconds...");
      const startRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-001:predictLongRunning?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [{ prompt: finalPrompt }],
            parameters: { aspectRatio: "9:16", durationSeconds: 8 },
          }),
        }
      );

      const startData = await startRes.json();
      if (startData.error) throw new Error(startData.error.message);

      let operationName = startData.name;
      let generatedUri = "";

      // Polling
      while (true) {
        await new Promise((r) => setTimeout(r, 6000));
        const pollRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/${operationName}?key=${apiKey}`
        );
        const pollData = await pollRes.json();
        if (pollData.done) {
          if (pollData.error) throw new Error(pollData.error.message);
          generatedUri = pollData.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
          break;
        }
        setStatus("Processing video... almost ready...");
      }

      if (!generatedUri) throw new Error("Video URL not returned from API");

      // Step 3: Download video with API key and create local blob url (THIS FIXES BLACK SCREEN)
      setStatus("Downloading video...");
      const videoFileRes = await fetch(`${generatedUri}&key=${apiKey}`);
      if (!videoFileRes.ok) throw new Error("Failed to download video file");
      const blob = await videoFileRes.blob();
      const localUrl = URL.createObjectURL(blob);

      setVideoUrl(localUrl);
      setStatus("Video Ready! ✅");

    } catch (err: any) {
      console.error(err);
      setStatus("");
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#08080a", color: "white", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1a1e" }}>
        <div style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "1px" }}>VIRALCRAFT<span style={{ color: "#7c3aed" }}>.AI</span></div>
        <div style={{ fontSize: "12px", background: "#1c1c1f", border: "1px solid #2a2a2e", padding: "6px 14px", borderRadius: "20px" }}>PRO • ONLINE</div>
      </div>

      <div style={{ maxWidth: "750px", margin: "70px auto", textAlign: "center", padding: "0 20px" }}>
        <h1 style={{ fontSize: "56px", fontWeight: 800, lineHeight: "1.05", marginBottom: "16px" }}>Turn Any Idea Into<br />Viral Video</h1>
        <p style={{ color: "#888", marginBottom: "36px", fontSize: "16px" }}>Built for TikTok, Reels & Shorts • 9:16 • Ultra Realistic</p>

        <div style={{ background: "#141416", border: "1px solid #232326", borderRadius: "24px", padding: "24px", textAlign: "left" }}>
          <div style={{ display: "flex", gap: "12px", background: "#0a0a0c", border: "1px solid #232326", borderRadius: "16px", padding: "8px" }}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Ramadan night, a boy looking at moon, cinematic..."
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", padding: "12px 14px", fontSize: "15px" }}
            />
            <button
              onClick={generateVideo}
              disabled={loading}
              style={{ background: "white", color: "black", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {loading? "Generating..." : "Generate Video ✨"}
            </button>
          </div>

          {status && <p style={{ marginTop: "18px", color: "#a78bfa", fontSize: "14px", textAlign: "center" }}>{status}</p>}

          {videoUrl && (
            <div style={{ marginTop: "24px" }}>
              <video src={videoUrl} controls autoPlay loop playsInline style={{ width: "100%", borderRadius: "16px", background: "black", maxHeight: "600px" }} />
              <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#888" }}>Your viral video is ready</span>
                <a href={videoUrl} download="viralcraft-video.mp4" style={{ background: "#7c3aed", color: "white", padding: "8px 18px", borderRadius: "20px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>Download</a>
              </div>
            </div>
          )}

          {!videoUrl &&!status && (
            <div style={{ marginTop: "24px", background: "#0a0a0c", border: "1px dashed #2a2a2e", borderRadius: "16px", height: "280px", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}>
              Your video will appear here
            </div>
          )}
        </div>

        <p style={{ marginTop: "50px", color: "#333", fontSize: "12px" }}>© 2026 ViralCraft AI - All Rights Reserved</p>
      </div>
    </div>
  );
}
