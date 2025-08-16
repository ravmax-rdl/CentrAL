import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'centrAL is a collaborative learning platform designed specifically for Sri Lankan G.C.E A/L students. Access comprehensive study resources, connect with peers, and excel in your Advanced Level examinations.',
  images: [
    {
      url: `${getServerSideURL()}/banner.webp`,
    },
  ],
  siteName: 'centrAL',
  title: 'centrAL',
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
