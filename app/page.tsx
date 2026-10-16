"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) return alert("Please enter an idea first");
    setLoading(true);
    setVideoUrl("");
    setStatus("Generating video... 1-2 minutes");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const model = "veo-3.0-fast-generate-preview";

      const startRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:predictLongRunning?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [{ prompt: prompt }],
            parameters: { aspectRatio: "9:16" },
          }),
        }
      );

      const startData = await startRes.json();
      if (!startData.name) throw new Error(startData.error?.message || "Model not found");

      while (true) {
        await new Promise((r) => setTimeout(r, 8000));
        const checkRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/${startData.name}?key=${apiKey}`
        );
        const checkData = await checkRes.json();
        if (checkData.done) {
          const uri = checkData.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
          const v = await fetch(`${uri}&key=${apiKey}`);
          setVideoUrl(URL.createObjectURL(await v.blob()));
          setStatus("Video Ready!");
          break;
        }
        setStatus("Processing...");
      }
    } catch (e: any) {
      alert("Error: " + e.message);
      setStatus("");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 900 }}>Turn Any Idea Into<br />Viral Video</h1>
      <p style={{ color: "#888" }}>Built for TikTok, Reels & Shorts | 9:16 | Ultra Realistic</p>

      <div style={{ background: "#141416", border: "1px solid #222", borderRadius: "20px", padding: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. A viral Ramadan video in Makkah..." style={{ flex: 1, padding: "14px", borderRadius: "12px", background: "#000", color: "#fff", border: "1px solid #333" }} />
          <button onClick={generateVideo} disabled={loading} style={{ padding: "14px 22px", borderRadius: "12px", background: "#fff", color: "#000", fontWeight: 800, cursor:"pointer" }}>{loading? "..." : "Generate"}</button>
        </div>
        {status && <p style={{ marginTop: "15px", color: "#a78bfa" }}>{status}</p>}
        {videoUrl && <video src={videoUrl} controls autoPlay loop playsInline style={{ width: "100%", maxWidth: "350px", marginTop: "20px", borderRadius: "16px" }} />}
      </div>
    </div>
  );
}
