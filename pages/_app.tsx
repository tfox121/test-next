import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../styles/theme';
import Layout from '../components/Layout';
import queryClient from '../config/queryClient';

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    // eslint-disable-next-line no-undef
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Radio.co Services</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
