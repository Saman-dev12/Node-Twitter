require("dotenv").config();
const express = require("express");
const { TwitterApi } = require("twitter-api-v2");

const app = express();
const port = process.env.PORT || 3000;

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCOUNT_ACCESS_TOKEN,
  accessSecret: process.env.ACCOUNT_TOKEN_SECRET,
});

async function getTweetFromCfBackend() {
  try {
    const response = await fetch("https://tweet.samanpreets84.workers.dev", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    return data.tweet;
  } catch (error) {
    console.error("Error fetching tweet:", error);
    throw error;
  }
}

app.post("/post-tweet", async (req, res) => {
  try {
    const tweetContent = await getTweetFromCfBackend();
    if (tweetContent) {
      await twitterClient.v2.tweet(tweetContent);
      res
        .status(200)
        .json({ message: "Tweet posted successfully", tweet: tweetContent });
    } else {
      res.status(500).json({ error: "Failed to fetch tweet content." });
    }
  } catch (error) {
    console.error("Error posting tweet:", error);
    res
      .status(500)
      .json({ error: "Error posting tweet", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
