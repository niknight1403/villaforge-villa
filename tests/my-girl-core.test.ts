import { RevenueOSModule } from '../src/my-girl-core';

describe('RevenueOSModule', () => {
  it('should filter products by margin threshold', async () => {
    const module = new RevenueOSModule();
    const data = [
      { name: 'High Margin Item', margin: 0.5, tags: ['tech'] },
      { name: 'Low Margin Item', margin: 0.2, tags: ['cheap'] }
    ];
    const result = await module.analyzeAndIntegrate(data);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('High Margin Item');
  });
});