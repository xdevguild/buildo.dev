import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // disallow devnet.buildo.dev indexing
  const rules = process.env.NEXT_PUBLIC_DAPP_HOST?.includes('devnet')
    ? { disallow: '/' }
    : { allow: '/' };

  return {
    rules: {
      userAgent: '*',
      ...rules,
    },
    sitemap: `${process.env.NEXT_PUBLIC_DAPP_HOST}/sitemap.xml`,
  };
}
