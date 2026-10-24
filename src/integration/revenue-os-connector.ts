/**
 * Revenue OS Connector Module
 * Handles the integration between market analysis and the storefront backend.
 */

export interface ProductPayload {
  id: string;
  name: string;
  price: number;
  currency: string;
  margin: number;
  tags: string[];
  timestamp: string;
}

export class RevenueOSConnector {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async pushProduct(payload: ProductPayload): Promise<boolean> {
    try {
      const response = await fetch(`${this.endpoint}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to push product to Revenue OS:', error);
      return false;
    }
  }
}
