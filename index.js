require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCOUNT_ACCESS_TOKEN,
  accessSecret: process.env.ACCOUNT_TOKEN_SECRET,
});

// Function to post the tweet
async function postTweet() {
  try {
    // const tweetContent = await generateTweet();
    const tweetContent = "Hello guys, this is a tweet";
    if (tweetContent) {
      await twitterClient.v2.tweet(tweetContent);
      console.log("Tweet posted:", tweetContent);
    } else {
      console.log("Failed to generate tweet.");
    }
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

postTweet();
