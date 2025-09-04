"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, RotateCw } from "lucide-react";
import { event } from "@/utils/gtag";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumePage() {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPdf() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/resume");
        if (!res.ok) {
          throw new Error(
            `Failed to fetch PDF: ${res.status} ${res.statusText}`
          );
        }

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/pdf")) {
          throw new Error("Response is not a PDF file");
        }

        const blob = await res.blob();
        if (blob.size === 0) {
          throw new Error("PDF file is empty");
        }

        setPdfBlob(blob);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadPdf();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF load error:", error);
    setError("Failed to load PDF document");
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-background`}
      >
        <div className="text-center text-primary-text">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-text mx-auto mb-4"></div>
          <p>Loading résumé...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-background`}
      >
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <Button
            size="lg"
            className="glass-morphism hover:animate-glow text-primary-text  px-8 py-4 text-lg bg-transparent"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RotateCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center px-4 sm:px-8 bg-background lg:pt-20 py-20`}
    >
      {/* PDF Viewer */}
      <div
        className={`group relative shadow-xl rounded-2xl overflow-hidden  max-w-sm sm:max-w-none`}
      >
        {pdfBlob ? (
          <Document
            file={pdfBlob}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="w-full h-auto"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              // width={pageWidth}
              className="[&>canvas]:mx-auto !m-0 max-w-full"
              width={
                window.innerWidth < 640
                  ? Math.min(window.innerWidth - 32, 450)
                  : 670
              }
            />
          </Document>
        ) : (
          <p className="text-center p-6">No PDF loaded</p>
        )}

        {/* nav pagianation */}
        {numPages && numPages > 1 && (
          <>
            {pageNumber > 1 && (
              <button
                className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full 
                     opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {pageNumber < numPages && (
              <button
                className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full 
                     opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, numPages))
                }
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </>
        )}
      </div>

      {/*pages count */}
      {numPages && (
        <p className="mt-4">
          Page {pageNumber} of {numPages}
        </p>
      )}

      {/* Download resume */}
      <a
        href="/api/resume"
        download="ogooluwaniAdewale_software-developer.pdf"
        className="mt-4"
        onClick={() =>
          event({ action: "download", category: "Resume", label: "Resume PDF" })
        }
      >
        <Button
          size="lg"
          className="glass-morphism hover:animate-glow text-primary-text  px-8 py-4 text-lg bg-transparent"
          variant="outline"
        >
          <Download className="mr-2 h-5 w-5" />
          {/* 📄 */}
          Download Résumé
        </Button>
      </a>
    </div>
  );
}
