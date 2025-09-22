'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePdfDocument, usePdfPageRenderer } from '../hooks/usePdf';

import 'pdfjs-dist/web/pdf_viewer.css';
import { fetchCatalogByUrl } from '@api/catalog/client';

// type CatalogApiResponse = { pdfUrl: string };

export default function ECatalogDemo({
  catalogApi,
  pdfUrl,
}: {
  catalogApi?: string;
  pdfUrl?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [resolvedPdfUrl, setResolvedPdfUrl] = useState<string>(pdfUrl || '/sample.pdf');
  const { pdf, numPages } = usePdfDocument(resolvedPdfUrl);
  const [pageNum, setPageNum] = useState<number>(1);
  const scale = 1.2;
  const { pageViewport } = usePdfPageRenderer(pdf, pageNum, scale, canvasRef);

  // Fetch catalog meta (pdfUrl only) for demo
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!catalogApi) return;
      const data = await fetchCatalogByUrl(catalogApi);
      if (!cancelled && data.pdfUrl) setResolvedPdfUrl(data.pdfUrl);
    })();
    return () => {
      cancelled = true;
    };
  }, [catalogApi]);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 items-center">
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 rounded bg-gray-200"
          onClick={() => setPageNum((p) => Math.max(1, p - 1))}
        >
          ◀ Prev
        </button>
        <div>
          Page {pageNum} / {numPages}
        </div>
        <button
          className="px-3 py-2 rounded bg-gray-200"
          onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
        >
          Next ▶
        </button>
      </div>

      <div
        className="relative border rounded shadow bg-white mx-auto"
        style={{ width: pageViewport?.width ?? undefined }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
    </div>
  );
}
