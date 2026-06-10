import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-black">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-[#6366F1] uppercase">
            404
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-6xl">
            Page Not Found
          </h1>
          <p className="mb-10 max-w-md text-white/45">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="rounded-full bg-[#6366F1] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4F46E5] hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]"
          >
            Back to Home
          </Link>
        </main>
      </body>
    </html>
  );
}
