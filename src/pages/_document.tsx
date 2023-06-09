import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate popular quotes in just a few seconds on airquotes.ai."
          />
          <meta property="og:site_name" content="airquotes.ai" />
          <meta
            property="og:description"
            content="Generate popular quotes in just a few seconds on airquotes.ai."
          />
          <meta property="og:title" content="AI Quote Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Quote Generator" />
          <meta
            name="twitter:description"
            content="Generate popular quotes in just a few seconds on airquotes.ai."
          />
          <meta
            property="og:image"
            content="https://airquotes.ai/og-cover.png"
          />
          <meta
            name="twitter:image"
            content="https://airquotes.ai/og-cover.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
