"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("RAMADAN VIRAL VIDEO");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are ViralCraft AI. Create a viral 30-second video script, 3 hooks, hashtags and caption for USA audience on topic: ${topic}. Make it for YouTube Shorts, TikTok, Reels. Output in clean format.` }] }]
        })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: Check API Key. Make sure NEXT_PUBLIC_GEMINI_API_KEY is set in Vercel.";
      setResult(text);
    } catch (e) {
      setResult("Error: " + e);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-2">ViralCraft AI</h1>
      <p className="text-gray-400 mb-8 text-center">Free AI Video Generator for YouTube Shorts, TikTok & Reels - Powered by Gemini 2.0</p>
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-4 rounded-xl text-black font-bold" placeholder="Enter topic..." />
        <button onClick={generate} disabled={loading} className="w-full mt-4 p-4 bg-white text-black font-bold rounded-xl">
          {loading? "Generating..." : "Generate Viral Script"}
        </button>
        {result && <div className="mt-6 p-4 bg-black rounded-xl whitespace-pre-wrap border border-green-500 text-green-400">{result}</div>}
      </div>
      <p className="mt-6 text-gray-500 text-sm">Made for USA Audience | Free Forever</p>
    </main>
  );
}
