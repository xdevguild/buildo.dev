import { MetadataRoute } from 'next';
import { operationsMenuConfig } from '@/lib/operations-menu-config';

const host = process.env.NEXT_PUBLIC_DAPP_HOST || 'https://www.buildo.dev';

const getOperationsPaths = () => {
  const paths: MetadataRoute.Sitemap = [];

  Object.keys(operationsMenuConfig).forEach((key) => {
    operationsMenuConfig[key]
      .filter((operation) => !operation.disabled)
      .map((o) => ({
        url: `${host}${o.path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
      .forEach((item) => {
        paths.push(item);
      });
  });

  return paths;
};
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...getOperationsPaths(),
    {
      url: `${host}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
