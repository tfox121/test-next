export default {
  MongoDbUri: process.env.MONGODB_URI ?? '',
  ApiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  GitHubId: process.env.GITHUB_ID ?? '',
  GitHubSecret: process.env.GITHUB_SECRET ?? '',
};
