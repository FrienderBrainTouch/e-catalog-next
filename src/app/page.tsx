import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-white to-rose-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-indigo-100/60">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <a href="/" className="font-semibold text-indigo-700">
            e‑Catalog
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
            <a href="#features" className="hover:text-indigo-700">
              특징
            </a>
            <a href="#how" className="hover:text-indigo-700">
              제작 과정
            </a>
            <a href="#portfolio" className="hover:text-indigo-700">
              포트폴리오
            </a>
            <a href="#contact" className="hover:text-indigo-700">
              문의
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 md:py-28 text-center">
        <div className="absolute -top-20 -left-20 h-64 w-64 bg-gradient-to-br from-indigo-400/40 via-fuchsia-300/40 to-rose-300/40 blur-3xl rounded-full -z-10" />
        <div className="absolute -bottom-10 -right-10 h-56 w-56 bg-gradient-to-br from-emerald-300/40 to-cyan-300/40 blur-3xl rounded-full -z-10" />
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-rose-700 bg-clip-text text-transparent">
          PDF 기반 e‑카탈로그 + 대화형 챗봇
        </h1>
        <p className="mt-5 text-gray-700 md:text-lg">
          기존 PDF 자산을 온라인 카탈로그로. 챗봇과 대화하며 원하는 항목으로 즉시 이동하고 정확한
          답을 얻으세요.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-2xl font-semibold mb-6">왜 e‑Catalog인가요?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="PDF 네이티브"
            desc="원본 PDF 그대로 렌더링해 인쇄물과 동일한 품질."
            accent="border-indigo-200 hover:border-indigo-300"
          />
          <FeatureCard
            title="정확한 탐색"
            desc="블록 단위 인덱싱으로 원하는 영역으로 바로 점프."
            accent="border-fuchsia-200 hover:border-fuchsia-300"
          />
          <FeatureCard
            title="챗봇 연동"
            desc="질문→정답 영역으로 이동·표시."
            accent="border-rose-200 hover:border-rose-300"
          />
          <FeatureCard
            title="배포 용이"
            desc="회사별 전용 URL 제공, 임베드도 간단."
            accent="border-emerald-200 hover:border-emerald-300"
          />
          <FeatureCard
            title="경량 뷰어"
            desc="웹에서 빠르게 로딩되는 최소 UI."
            accent="border-cyan-200 hover:border-cyan-300"
          />
          <FeatureCard
            title="보안 선택"
            desc="사내망/접근제어/서명 URL 등 선택 구성."
            accent="border-amber-200 hover:border-amber-300"
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-2xl font-semibold mb-6">제작 과정</h2>
        <ol className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <li className="rounded-lg border border-indigo-100 p-4 bg-white/70">
            <b className="block mb-2">1) PDF 수령</b> 기존 카탈로그 PDF 전달
          </li>
          <li className="rounded-lg border border-fuchsia-100 p-4 bg-white/70">
            <b className="block mb-2">2) 전처리/인덱싱</b> 블록 단위 영역 추출
          </li>
          <li className="rounded-lg border border-rose-100 p-4 bg-white/70">
            <b className="block mb-2">3) 배포/연동</b> 회사 전용 URL과 챗봇 연결
          </li>
        </ol>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-2xl font-semibold mb-6">포트폴리오</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/naver-esg"
            className="rounded-lg border border-indigo-200 p-4 bg-white/70 hover:bg-indigo-50/50"
          >
            <div className="text-sm text-gray-500">Case</div>
            <div className="font-medium">NAVER ESG</div>
            <div className="text-sm text-gray-600 mt-1">PDF 뷰어 + 전용 URL</div>
          </Link>
          <Link
            href="/hotel-laundry"
            className="rounded-lg border border-fuchsia-200 p-4 bg-white/70 hover:bg-fuchsia-50/50"
          >
            <div className="text-sm text-gray-500">Case</div>
            <div className="font-medium">Hotel Laundry</div>
            <div className="text-sm text-gray-600 mt-1">PDF 뷰어</div>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-xl border p-6 ring-1 ring-indigo-100 bg-white/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">도입 문의</div>
            <div className="text-gray-600 text-sm">PDF만 주시면 나머지는 저희가 맡습니다.</div>
          </div>
          <a
            href="mailto:contact@example.com"
            className="px-5 py-3 rounded-md bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 text-white shadow hover:shadow-lg transition"
          >
            이메일 보내기
          </a>
        </div>
      </section>

      <footer className="border-t border-indigo-100">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between text-sm text-gray-600">
          <div>© {new Date().getFullYear()} e‑Catalog</div>
          <div className="hidden sm:block">PDF‑first Catalog with Chatbot</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, accent }: { title: string; desc: string; accent: string }) {
  return (
    <div className={`rounded-lg border p-5 bg-white/70 hover:bg-white transition ${accent}`}>
      <div className="font-medium mb-1">{title}</div>
      <div className="text-sm text-gray-600">{desc}</div>
    </div>
  );
}
