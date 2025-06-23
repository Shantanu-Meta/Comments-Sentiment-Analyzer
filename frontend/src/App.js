import React, { useState } from "react";
import AnalyzeForm from "./components/AnalyzeForm";
import Results from "./components/Results";

function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse transform rotate-12"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse transform -rotate-12 animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2 rotate-45 animation-delay-2000"></div>
      </div>
      
      {/* Tilted glass panels */}
      <div className="absolute top-20 left-10 w-32 h-64 bg-gradient-to-br from-green-500/20 to-transparent backdrop-blur-sm rounded-3xl transform rotate-12 border border-white/10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-80 bg-gradient-to-br from-orange-500/20 to-transparent backdrop-blur-sm rounded-3xl transform -rotate-12 border border-white/10"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-48 bg-gradient-to-br from-green-400/15 to-transparent backdrop-blur-sm rounded-3xl transform rotate-45 border border-white/10"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Header with enhanced styling */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-green-400 bg-clip-text text-transparent mb-6 animate-pulse">
            🔍 Social Media Sentiment Analyzer
          </h2>
          <p className="text-white/70 text-lg">
            Discover the emotional tone of social media posts with AI-powered analysis
          </p>
        </div>
        
        <AnalyzeForm onResult={setAnalysis} />
        {analysis && <Results data={analysis} />}
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-bounce animation-delay-500"></div>
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-bounce animation-delay-1500"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-green-300 rounded-full opacity-50 animate-bounce animation-delay-2500"></div>
      </div>
    </div>
  );
}

export default App;