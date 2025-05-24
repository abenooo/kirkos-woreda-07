import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Site Map</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">General</h2>
        <ul>
          <li className="mb-2"><Link href="/">Home</Link></li>
          <li className="mb-2"><Link href="/services">Services</Link></li>
          <li className="mb-2"><Link href="/news">News</Link></li>
          <li className="mb-2"><Link href="/requirements">Requirements</Link></li>
          <li className="mb-2"><Link href="/search">Search</Link></li>
          <li className="mb-2"><Link href="/complaints">Complaints</Link></li>
          <li className="mb-2"><Link href="/anonymous">Anonymous</Link></li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <ul>
          <li className="mb-2"><Link href="/about">About</Link></li>
          <li className="mb-2"><Link href="/about/core-values">Core Values</Link></li>
          <li className="mb-2"><Link href="/about/mission">Mission</Link></li>
          <li className="mb-2"><Link href="/about/vision">Vision</Link></li>
        </ul>
      </div>

    </div>
  );
}
