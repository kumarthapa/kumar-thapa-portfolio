export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    signal: init?.signal ?? AbortSignal.timeout(10000),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      body?.error?.message || "Unable to connect. Please try again.",
    );
  return body.data as T;
}
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(cents / 100);
