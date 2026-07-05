const requests = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requests) {
    if (now - data.start > 60000) requests.delete(key);
  }
}, 300000);

export function rateLimit(ip, max = 5) {
  const now = Date.now();
  const key = `rate:${ip}`;
  const data = requests.get(key);

  if (!data || now - data.start > 60000) {
    requests.set(key, { count: 1, start: now });
    return { allowed: true, remaining: max - 1 };
  }

  data.count++;

  if (data.count > max) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: max - data.count };
}
