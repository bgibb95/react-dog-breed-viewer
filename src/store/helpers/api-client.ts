const maxRetries = 3;
const initialBackoffTimeInMilliseconds = 1000; // 1 second
const tooManyRequestsHttpStatusCode = 429;

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const backoffTimeInMilliseconds = (attempt: number) => initialBackoffTimeInMilliseconds * Math.pow(2, attempt);

export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) return (await response.json()) as T;

      if (response.status === tooManyRequestsHttpStatusCode && attempt < maxRetries) {
        await sleep(backoffTimeInMilliseconds(attempt));
        continue;
      }

      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    } catch (error: unknown) {
      if (attempt === maxRetries) throw error;

      await sleep(backoffTimeInMilliseconds(attempt));
    }
  }

  throw new Error('Max retries reached');
}
