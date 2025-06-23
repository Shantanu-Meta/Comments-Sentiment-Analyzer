import React from "react";

function Results({ data }) {
  if (!data || data?.comments.length === 0)
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-orange-500/10 blur-xl"></div>
        <div className="relative z-10">
          <p className="text-white/70 text-lg">No comments to display.</p>
        </div>
      </div>
    );

  const sentimentCount = {
    Positive: 0,
    Neutral: 0,
    Negative: 0,
  };

  data?.comments.forEach((item) => {
    sentimentCount[item.sentiment] =
      (sentimentCount[item.sentiment] || 0) + 1;
  });

  const getColor = (sentiment) => {
    if (sentiment === "Positive") return "text-green-400";
    if (sentiment === "Negative") return "text-red-400";
    return "text-gray-400";
  };

  const getSentimentBorder = (sentiment) => {
    if (sentiment === "Positive") return "border-green-500/30";
    if (sentiment === "Negative") return "border-red-500/30";
    return "border-gray-500/30";
  };

  const total = data?.comments.length;

  return (
    <div className="space-y-8">
      {/* Overall Sentiment Breakdown */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden transform  transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-orange-500/10 to-green-500/10 blur-xl"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-400/20 rounded-full blur-xl transform translate-x-4 -translate-y-4 rotate-45"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            🧠 Overall Sentiment Breakdown
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <div className="text-3xl font-bold text-green-400 mb-2">{sentimentCount.Positive}</div>
              <div className="text-green-300 text-sm font-medium">✨ Positive</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-500/20 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20">
              <div className="text-3xl font-bold text-gray-400 mb-2">{sentimentCount.Neutral}</div>
              <div className="text-gray-300 text-sm font-medium">😐 Neutral</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
              <div className="text-3xl font-bold text-red-400 mb-2">{sentimentCount.Negative}</div>
              <div className="text-red-300 text-sm font-medium">😔 Negative</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-green-500/10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/20 rounded-full blur-xl transform -translate-x-8 translate-y-8 -rotate-12"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            🤖 Pro Tips
          </h3>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-white/80 text-lg leading-relaxed">
              {data.suggestion}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Analysis */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-green-500/10 via-orange-500/10 to-green-500/10 blur-xl"></div>
        <div className="absolute top-1/2 right-0 w-28 h-28 bg-green-400/20 rounded-full blur-xl transform translate-x-8 rotate-12"></div>
        
        <div className="relative z-10">
          <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
            📝 Comments Analyzed ({total})
          </h4>
          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {data?.comments.map((c, idx) => (
              <div 
                key={idx} 
                className={`p-6 bg-black/20 backdrop-blur-sm border ${getSentimentBorder(c.sentiment)} rounded-2xl shadow-lg transform  transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-white/90 mb-2">
                      <span className="font-semibold text-white bg-white/10 px-3 py-1 rounded-lg mr-2">
                        {c.username}
                      </span>
                    </p>
                    <p className="text-white/80 leading-relaxed">{c.text}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getColor(c.sentiment)} bg-black/30`}>
                      {c.sentiment === "Positive" ? "😊 Positive" : 
                       c.sentiment === "Negative" ? "😔 Negative" : 
                       "😐 Neutral"}
                    </span>
                    <span className="text-orange-400 text-sm font-medium bg-black/20 px-3 py-1 rounded-lg">
                      👍 {c.likes} likes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;