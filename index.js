require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

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
    console.log(data.tweet);
    return data.tweet;
  } catch (error) {
    console.error("Error fetching tweet:", error);
  }
}

async function postTweet() {
  try {
    const tweetContent = await getTweetFromCfBackend();
    if (tweetContent) {
      await twitterClient.v2.tweet(tweetContent);
      console.log("Tweet posted:", tweetContent);
    } else {
      console.log("Failed to post tweet.");
    }
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

postTweet();
