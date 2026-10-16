"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");

  async function generateVideo() {
    if (!prompt.trim()) {
      alert("پہلے کوئی آئیڈیا لکھو");
      return;
    }
    setLoading(true);
    setVideoUrl("");
    setStatus("ویڈیو بن رہی ہے... 1 سے 2 منٹ لگیں گے");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      // 1. ویڈیو بنانا شروع کرو - Veo 2 سب سے سٹیبل ہے
      const startRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-2.0-generate-001:predictLongRunning?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [{ prompt: prompt }],
            parameters: { aspectRatio: "9:16", durationSeconds: 8 },
          }),
        }
      );

      const startData = await startRes.json();
      if (!startData.name) {
        throw new Error(startData.error?.message || "ماڈل میں مسئلہ ہے");
      }

      let operationName = startData.name;

      // 2. بار بار چیک کرو کہ ویڈیو بنی یا نہیں
      while (true) {
        await new Promise((r) => setTimeout(r, 7000));
        const checkRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/${operationName}?key=${apiKey}`
        );
        const checkData = await checkRes.json();

        if (checkData.done) {
          const videoUri =
            checkData.response?.generateVideoResponse?.generatedSamples?.[0]
              ?.video?.uri;
          if (!videoUri) throw new Error("ویڈیو نہیں ملی");

          const videoFetch = await fetch(`${videoUri}&key=${apiKey}`);
          const blob = await videoFetch.blob();
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
          setStatus("تیار ہو گئی ✅");
          break;
        } else {
          setStatus("پروسیسنگ ہو رہی ہے...");
        }
      }
    } catch (err: any) {
      alert("Error: " + err.message);
      setStatus("");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 900, lineHeight: "1.1", marginBottom: "10px" }}>
        Turn Any Idea Into<br />Viral Video
      </h1>
      <p style={{ color: "#888", marginBottom: "30px" }}>
        Built for TikTok, Reels & Shorts • 9:16 • Ultra Realistic
      </p>

      <div style={{ background: "#141416", border: "1px solid #222", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Ramadan viral video in Makkah..."
            style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid #333", background: "#000", color: "#fff" }}
          />
          <button
            onClick={generateVideo}
            disabled={loading}
            style={{ padding: "14px 22px", borderRadius: "12px", border: "none", background: "#fff", color: "#000", fontWeight: 800, cursor: "pointer" }}
          >
            {loading ? "..." : "Generate ✨"}
          </button>
        </div>

        {status && <p style={{ marginTop: "15px", color: "#a78bfa" }}>{status}</p>}

        {videoUrl && (
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            playsInline
            style={{ width: "100%", maxWidth: "350px", marginTop: "20px", borderRadius: "16px", border: "1px solid #333" }}
          />
        )}
      </div>
    </div>
  );
}
