const maxRetries = 3;
const initialBackoffTimeInMilliseconds = 1000; // 1 second
const tooManyRequestsHttpStatusCode = 429;

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const backoffTimeInMilliseconds = (attempt: number) =>
  initialBackoffTimeInMilliseconds * Math.pow(2, attempt);
const isTransientError = (status: number) =>
  status === tooManyRequestsHttpStatusCode || (status >= 500 && status <= 599);

export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok) return (await response.json()) as T;

    if (!isTransientError(response.status) || attempt === maxRetries) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    await sleep(backoffTimeInMilliseconds(attempt));
  }

  throw new Error('Unreachable: Max retries exhausted');
}
