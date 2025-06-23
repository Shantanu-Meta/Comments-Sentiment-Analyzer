const express = require("express");
require('dotenv').config(); // ✅ Load env vars
const router = express.Router();
const { ApifyClient } = require("apify-client");
const fetch = require("node-fetch");
const { GoogleGenAI } = require("@google/genai");

const client = new ApifyClient({
      token: process.env.APIFY_API,
});

async function analyzeSentiment(comments) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API,
  });

  const prompt = `You are a sentiment analysis model. Given a list of comments, analyze each comment's sentiment as one of:
- Positive
- Neutral
- Negative

Take into account both the *text* and the *likesCount*(if given) to evaluate how positive or negative the comment is. More over add a note about how people reacted and give suggestion after analyzing the sentiment of all the comments within 2 lines.

Return only a JSON object in the following format:
{
  "comments": [{
    "text": "...",
    "likes": 0,
    "sentiment": "Positive"
  },
  ...
  ],
  "suggestion": "..."
}

Here are the comments:
${JSON.stringify(comments, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const responseText = response.candidates[0].content.parts[0].text;

  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}") + 1;
  const jsonString = responseText.slice(jsonStart, jsonEnd);
  const parsedJSON = JSON.parse(jsonString);
  return parsedJSON;
}

async function scrapeByDetectingURL(url) {
  if (url.includes("instagram.com")) {
    const input = {
      directUrls: [`${url}`],
      resultsType: "comments",
      resultsLimit: 20,
    };
    const run = await client.actor("apify/instagram-scraper").call(input);
    return run;
  } else if (url.includes("facebook.com")) {
    const input = {
      startUrls: [
        {
          url: `${url}`,
        },
      ],
      resultsLimit: 20,
    };

    const run = await client.actor("apify/facebook-comments-scraper").call(input);
    return run;
  } else {
    throw new Error(
      "Unsupported URL format. Only Instagram and Facebook URLs are supported."
    );
  }
}

// POST /api/scrape
router.post("/scrape", async (req, res) => {
  const { url } = req.body;
  const comments = [];

  try {

    const run = await scrapeByDetectingURL(url);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const extractedItems = [];
    const inputForGemini = [];
    items.forEach((item) => {
      extractedItems.push({
        username: item.ownerUsername || item.profileName,
        text: item.text,
        likes: item.likesCount,
      });
      inputForGemini.push({
        text: item.text,
        likesCount: item.likesCount,
      });
    });

    const sentimentResult = await analyzeSentiment(inputForGemini);
    for (let i = 0; i < extractedItems.length; i++) {
      const gResult = sentimentResult.comments.find(
        (g) => g.text === extractedItems[i].text
      );
      
      comments.push({
        ...extractedItems[i],
        sentiment: gResult?.sentiment || "Unknown",
      });
    }

    res.json({ comments, suggestion: sentimentResult.suggestion });
  } catch (err) {
    console.error("Scraping or Sentiment Analysis failed:", err.message);
    res.status(500).json({ error: "Scraping or Sentiment Analysis failed" });
  }
});

module.exports = router;

