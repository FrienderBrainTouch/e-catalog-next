import ECatalogClient from '../../components/ECatalogClient';

export default function HotelLaundryCatalog() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-white to-rose-50">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-indigo-100/60">
        <div className="mx-auto max-w-6xl px-5 h-12 flex items-center justify-between">
          <a href="/" className="font-semibold text-indigo-700">
            e‑Catalog
          </a>
          <a href="/" className="text-sm text-gray-700 hover:text-indigo-700">
            홈
          </a>
        </div>
      </header>
      <section className="w-full px-5 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Hotel Laundry Catalog</h1>
        <ECatalogClient catalogApi="/api/catalog/hotel-laundry" />
      </section>
      <footer className="border-t border-indigo-100">
        <div className="mx-auto max-w-6xl px-5 h-12 flex items-center justify-between text-sm text-gray-600">
          <div>© {new Date().getFullYear()} e‑Catalog</div>
          <div className="hidden sm:block">PDF‑first Catalog with Chatbot</div>
        </div>
      </footer>
    </div>
  );
}
