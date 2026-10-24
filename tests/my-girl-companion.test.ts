import { MyGirlCompanion } from '../src/core/my-girl-companion';
import { expect, test, describe } from 'vitest';

describe('MyGirlCompanion', () => {
  test('should initialize with supportive mood', () => {
    const companion = new MyGirlCompanion('User');
    expect(companion.getStatus().mood).toBe('supportive');
  });

  test('should switch to analytical mood for technical tasks', () => {
    const companion = new MyGirlCompanion('User');
    const result = companion.processInput('Fix this code');
    expect(result.mood).toBe('analytical');
    expect(result.response).toContain('technical details');
  });
});