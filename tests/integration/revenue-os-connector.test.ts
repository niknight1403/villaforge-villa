import { RevenueOSConnector, ProductPayload } from '../../src/integration/revenue-os-connector';
import { describe, it, expect, vi } from 'vitest';

describe('RevenueOSConnector', () => {
  it('should successfully push a product payload', async () => {
    const connector = new RevenueOSConnector('https://api.example.com');
    const payload: ProductPayload = {
      id: 'test-123',
      name: 'Test Product',
      price: 99.99,
      currency: 'EUR',
      margin: 0.45,
      tags: ['test', 'ai'],
      timestamp: new Date().toISOString()
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    const result = await connector.pushProduct(payload);
    expect(result).toBe(true);
  });
});