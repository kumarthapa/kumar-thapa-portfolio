"use client";

import Image from "next/image";
import { useState } from "react";
import { Layers3 } from "lucide-react";
import type { VisualAsset } from "@/content/visuals";

export function AssetImage({
  asset,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  asset: VisualAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  return (
    <div className={`asset-image ${className}`}>
      {failedSource === asset.src ? (
        <div className="asset-fallback" role="img" aria-label={asset.alt}>
          <Layers3 size={64} />
          <span>Designed with purpose.</span>
        </div>
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          unoptimized={asset.src.startsWith("https://")}
          sizes={sizes}
          preload={priority}
          style={{
            objectFit: asset.fit || "cover",
            objectPosition: asset.position || "center",
          }}
          onError={() => setFailedSource(asset.src)}
        />
      )}
    </div>
  );
}
