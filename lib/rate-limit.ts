// Простое окно частоты запросов в памяти процесса.
// На serverless счётчик живёт в пределах инстанса — этого достаточно,
// чтобы отсечь скриптовый спам. Для жёсткого лимита подключите Upstash Redis.

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number }

export function checkRateLimit(key: string, now = Date.now()): RateLimitResult {
  // Периодическая чистка, чтобы Map не рос бесконечно.
  if (buckets.size > 5000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey)
    }
  }

  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  bucket.count += 1

  if (bucket.count > MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

/** IP клиента за прокси Vercel. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return headers.get('x-real-ip') ?? 'unknown'
}
