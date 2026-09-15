import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container checkout">
      <h1>Page not found.</h1>
      <Link className="primary" href="/">
        Back to the studio
      </Link>
    </main>
  );
}
