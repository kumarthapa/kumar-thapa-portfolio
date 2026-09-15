"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container checkout">
      <h1>Something went wrong.</h1>
      <p>Please try loading this page again.</p>
      <button className="primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
