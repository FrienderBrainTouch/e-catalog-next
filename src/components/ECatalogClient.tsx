'use client';

import dynamic from 'next/dynamic';

const ECatalogDemo = dynamic(() => import('./ECatalogDemo'), { ssr: false });

export default function ECatalogClient({ catalogApi }: { catalogApi?: string }) {
  return <ECatalogDemo catalogApi={catalogApi || '/api/catalog'} />;
}
