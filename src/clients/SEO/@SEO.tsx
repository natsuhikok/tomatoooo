import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { EmojiFavicon } from "src/clients/SEO/emojiFavicon";

type Props = {
  title: string;
  description: string;
  faviconEmoji: string;
}

const CONTENT_TYPE = "website";
const SITE_NAME = "Tomatoooo";
const LOCALE = "en_US";
const TWITTER_NAME = "hikonaz";
const IMAGE_URI = `${process.env.CLIENT_URL}/ogp.png`;

export const SEO: FC<Props> = (props) => {
  const router = useRouter();
  const currentPageURI = `${process.env.CLIENT_URL}/${router.pathname}`;
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      {props.faviconEmoji && <EmojiFavicon emoji={props.faviconEmoji} />}

      {/* Open Graph */}
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content={CONTENT_TYPE} />
      <meta property="og:url" content={currentPageURI} />
      <meta property="og:image" content={IMAGE_URI} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={props.description} />
      <meta property="og:locale" content={LOCALE} />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_NAME} />
      <meta name="twitter:creator" content={TWITTER_NAME} />
    </Head>
  )
}