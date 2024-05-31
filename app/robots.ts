import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // disallow devnet.buildo.dev indexing
  const rules =
    process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN === 'devnet'
      ? { disallow: '/' }
      : { allow: '/', disallow: '/gpt-privacy' };

  return {
    rules: {
      userAgent: '*',
      ...rules,
    },
    sitemap: `${process.env.NEXT_PUBLIC_DAPP_HOST}/sitemap.xml`,
  };
}
