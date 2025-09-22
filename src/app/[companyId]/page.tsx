import ECatalogClient from '../../components/ECatalogClient';

export default async function CompanyCatalog({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  // 회사별 API 엔드포인트: /api/catalog?companyId=...
  const api = `/api/catalog?companyId=${encodeURIComponent(companyId)}`;
  return (
    <main className="w-screen h-screen">
      <ECatalogClient catalogApi={api} />
    </main>
  );
}
