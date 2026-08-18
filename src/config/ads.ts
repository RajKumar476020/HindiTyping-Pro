export interface AdConfig {
  id: string;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  slot: string;
}

export const ADS: AdConfig[] = [
  {
    id: 'footer-banner-1',
    imageUrl: '/Banner.png',
    linkUrl: '#',
    altText: 'Gayatri Art Advertisement',
    slot: 'footer'
  }
];
