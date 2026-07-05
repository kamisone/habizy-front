/**
 * Returns the API base URL for the current execution context.
 *
 * Browser  → NEXT_API_BASE_URL_BROWSER (e.g. https://habizy.com/next-api)
 *            Hits the Next.js catch-all proxy at src/app/next-api/[...path]/route.ts
 *            which forwards the request to the NestJS backend.
 *
 * Server   → API_BASE_URL_SERVER (e.g. http://api-cluster-ip-service.default.svc.cluster.local/api)
 *            Direct call to NestJS — no loopback through Next.js.
 */
export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_API_BASE_URL_BROWSER ?? '/next-api';
  }
  return process.env.API_BASE_URL_SERVER ?? 'http://127.0.0.1:4000';
}
