import { apiClient } from './api-client';

describe('apiClient', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockData = { message: 'success' };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should return data on a successful response', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await apiClient(mockUrl);

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(mockUrl, {});
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error on a non-transient error (e.g., 404) immediately without retries', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(apiClient(mockUrl)).rejects.toThrow('API request failed with status 404');

    // 1 initial attempt
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should retry on a 500 server error and succeed', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

    const [result] = await Promise.all([
      apiClient<typeof mockData>(mockUrl),
      vi.runAllTimersAsync(),
    ]);

    expect(result).toEqual(mockData);
    // 1 initial attempt + 1 successful retry
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should fail immediately on a network error without retrying', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network failure'));

    await expect(apiClient<typeof mockData>(mockUrl)).rejects.toThrow('Network failure');

    // 1 initial attempt
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should retry on a 429 rate limit response and succeed', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

    // Run timers concurrently so the retry sleep resolves
    const [result] = await Promise.all([
      apiClient<typeof mockData>(mockUrl),
      vi.runAllTimersAsync(),
    ]);

    expect(result).toEqual(mockData);
    // 1 initial attempt + 1 successful retry
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should throw after exhausting all retries on 429', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    } as Response);

    // Run timers concurrently with the assertion so all retries complete
    await Promise.all([
      expect(apiClient(mockUrl)).rejects.toThrow('API request failed with status 429'),
      vi.runAllTimersAsync(),
    ]);

    // 1 initial attempt + 3 retries = 4 total
    expect(fetch).toHaveBeenCalledTimes(4);
  });
});
