import React, { useState } from "react";

function AnalyzeForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      onResult(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to analyze. Try a different URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      {/* Neon glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-orange-500/20 to-green-500/20 blur-xl"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/30 rounded-full blur-2xl transform -translate-x-8 -translate-y-8 rotate-12"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl transform translate-x-8 translate-y-8 -rotate-12"></div>
      
      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Paste social media post URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full sm:w-2/3 px-6 py-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 shadow-lg"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 disabled:transform-none disabled:shadow-none relative overflow-hidden min-w-[140px] flex items-center justify-center"
          >
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-orange-600/20 animate-pulse"></div>
            )}
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </>
              ) : (
                "Analyze"
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnalyzeForm;