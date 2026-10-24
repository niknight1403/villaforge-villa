import { describe, it, expect } from 'vitest';
import { StripeCheckoutService } from '../src/services/stripe-checkout-service';

describe('StripeCheckoutService', () => {
  const service = new StripeCheckoutService('sk_test_123', 'whsec_123', true);

  it('should create a checkout session successfully', async () => {
    const session = await service.createCheckoutSession({
      priceId: 'price_123',
      userId: 'user_456',
      userEmail: 'test@example.com',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel'
    });

    expect(session.sessionId).toBeDefined();
    expect(session.checkoutUrl).toContain('checkout.stripe.com');
    expect(session.status).toBe('initialized');
  });

  it('should throw error on missing priceId or userId', async () => {
    await expect(service.createCheckoutSession({
      priceId: '',
      userId: '',
      userEmail: 'test@example.com',
      successUrl: '',
      cancelUrl: ''
    })).rejects.toThrow();
  });

  it('should verify webhook signature correctly in test mode', () => {
    const isValid = service.verifyWebhookSignature('payload', 't=123,sig=abc');
    expect(isValid).toBe(true);
  });

  it('should handle subscription events properly', () => {
    const result = service.handleSubscriptionEvent('checkout.session.completed', 'cus_123');
    expect(result.handled).toBe(true);
    expect(result.status).toBe('active');

    const ignored = service.handleSubscriptionEvent('unknown.event', 'cus_123');
    expect(ignored.handled).toBe(false);
  });
});
