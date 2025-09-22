export type CatalogApiResponse = {
  docId: string;
  version?: string;
  pdfUrl: string;
};

function withBase(url: string): string {
  // 외부 서버에서 운영되는 API 베이스(예: https://api.example.com)
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
  if (!base) return url; // 베이스가 없으면 상대경로 그대로 사용
  if (/^https?:\/\//i.test(url)) return url; // 이미 절대 URL
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
}

export async function fetchCatalogByUrl(url: string): Promise<CatalogApiResponse> {
  // 1) 로컬 더미 단축 경로 지원 (서버 없이 동작)
  const lower = url.toLowerCase();
  const getParam = (name: string) => {
    try {
      const u = new URL(url, 'http://local');
      return u.searchParams.get(name) || undefined;
    } catch {
      return undefined;
    }
  };
  if (lower.includes('/api/catalog/hotel-laundry') || getParam('companyId') === 'hotel-laundry') {
    return { docId: 'hotel-laundry', version: 'v1', pdfUrl: '/hotelLaundry.pdf' };
  }
  if (lower.includes('/api/catalog/naver-esg') || getParam('companyId') === 'naver-esg') {
    return { docId: 'naver-esg', version: 'v1', pdfUrl: '/sample.pdf' };
  }
  if (lower.includes('/api/catalog')) {
    // 기본 샘플
    return { docId: 'demo', version: 'v1', pdfUrl: '/sample.pdf' };
  }

  // 2) 그 외 절대/커스텀 경로는 실제 요청
  const res = await fetch(withBase(url), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Catalog API error: ${res.status}`);
  return (await res.json()) as CatalogApiResponse;
}

export async function fetchCatalog(companyId?: string): Promise<CatalogApiResponse> {
  const qs = companyId ? `?companyId=${encodeURIComponent(companyId)}` : '';
  return fetchCatalogByUrl(`/api/catalog${qs}`);
}

export async function fetchCatalogBySlug(
  slug: 'naver-esg' | 'hotel-laundry'
): Promise<CatalogApiResponse> {
  return fetchCatalogByUrl(`/api/catalog/${slug}`);
}
