import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import endpoint from '../../../config/endpoints.config';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: endpoint.GitHubId,
      clientSecret: endpoint.GitHubSecret,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
});
