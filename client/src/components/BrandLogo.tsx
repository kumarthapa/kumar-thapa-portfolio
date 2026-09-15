/** Originals are preserved byte-for-byte; CSS frames their existing whitespace. */
export function BrandLogo({
  theme = "dark",
  compact = false,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
}) {
  if (compact)
    return (
      <span className="brand-mark">
        <img
          src="/brand/kt-brand.png"
          alt="KT brand"
          width={1254}
          height={1254}
        />
      </span>
    );
  return (
    <img
      className="company-wordmark"
      src={`/brand/company-${theme}.png`}
      alt="KUMARTHAPA — Software, Services, Solutions"
      width={1254}
      height={1254}
    />
  );
}
