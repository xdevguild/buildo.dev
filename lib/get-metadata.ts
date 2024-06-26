const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;
const globalTitle = 'Your MultiversX Companion - Saving You Time';
const globalDescription =
  'Buildo.dev is a MultiversX app that simplifies blockchain interactions, like issuing tokens and preparing and broadcasting transactions.';
const globalImage = `${dappHostname}/og-image.png`;

export const getMetadata = ({
  isRoot,
  pagePath,
  title,
  description,
}: {
  isRoot?: boolean;
  pagePath?: string;
  title?: string;
  description?: string;
}) => {
  return {
    ...(isRoot ? { metadataBase: new URL(dappHostname!) } : {}),
    title: title || globalTitle,
    description: description || globalDescription,
    authors: { name: 'Buildo.dev', url: 'https://www.buildo.dev' },
    openGraph: {
      title: title || globalTitle,
      images: [globalImage],
      description: description || globalDescription,
      type: 'website',
      url: isRoot ? dappHostname : `${dappHostname}${pagePath}`,
    },
    twitter: {
      title: title || globalTitle,
      description: description || globalDescription,
      images: [globalImage],
      card: 'summary_large_image',
    },
  };
};
