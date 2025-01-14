require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCOUNT_ACCESS_TOKEN,
  accessSecret: process.env.ACCOUNT_TOKEN_SECRET,
});

async function generateTweetUsingAI() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `I want to post a humorous tweet on my account. The tweet should be tech-related, vary in length, and be both humorous and informative at times. People should like it. Return only the tweet. Do not return anything else. Don't add hashtags. let the jokes for the genz type people mostly related to Full stack development,Web3 and AI and never ever give the same or even similar tweet`;

  const result = await model.generateContent(prompt, {
    maxTokens: 100,
    temperature: 0.95,
    topP: 0.95,
    topK: 40,
  });
  console.log(result.response.text());
  return result.response.text();
}

async function generateTweet() {
  try {
    const res = await generateTweetUsingAI();
    return res;
  } catch (error) {
    console.error("Error generating tweet:", error);
    return null;
  }
}

async function postTweet() {
  try {
    const tweetContent = await generateTweet();
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
