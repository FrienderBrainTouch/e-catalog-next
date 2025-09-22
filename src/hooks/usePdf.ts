'use client';

import { RefObject, useEffect, useState } from 'react';

// 최소한으로 필요한 pdf.js 타입 정의 (CDN 모듈을 쓰므로 로컬에서 인터페이스만 정의)
type PDFViewport = { width: number; height: number };
type PDFPage = {
  getViewport: (params: { scale: number }) => PDFViewport;
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PDFViewport;
    transform?: number[];
  }) => { promise: Promise<void> };
};
type PDFDoc = {
  numPages: number;
  getPage: (pageNum: number) => Promise<PDFPage>;
};
type PDFJSModule = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (url: string) => { promise: Promise<PDFDoc> };
};

export function usePdfDocument(pdfUrl: string) {
  const [pdf, setPdf] = useState<PDFDoc | null>(null);
  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const PDFJS_MJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs';
      const PDFJS_WORKER_MJS =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';
      // CDN ESM 모듈은 타입이 없어 명시적 단언 사용
      const pdfjsLib = (await import(
        /* webpackIgnore: true */ PDFJS_MJS
      )) as unknown as PDFJSModule;
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_MJS;
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const _pdf = await loadingTask.promise;
      if (!mounted) return;
      setPdf(_pdf);
      setNumPages(_pdf.numPages);
    })();
    return () => {
      mounted = false;
    };
  }, [pdfUrl]);

  return { pdf, numPages } as const;
}

export function usePdfPageRenderer(
  pdf: PDFDoc | null,
  pageNum: number,
  scale: number,
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  const [pageViewport, setPageViewport] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    (async () => {
      if (!pdf || !canvasRef.current) return;
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // Retina/HiDPI 대응: 실제 캔버스 픽셀을 DPR만큼 키우고, CSS 크기는 원래대로 유지
      const dpr =
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      setPageViewport({ width: viewport.width, height: viewport.height });
      const transform = dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined;
      const renderTask = page.render({ canvasContext: ctx, viewport, transform });
      await renderTask.promise;
    })();
  }, [pdf, pageNum, scale, canvasRef]);

  return { pageViewport } as const;
}
