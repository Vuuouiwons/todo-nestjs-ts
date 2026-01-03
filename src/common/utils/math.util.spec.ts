import { add } from './math.util';

describe('MathUtils', () => {
  it('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5); // The assertion
  });

  it('should return a number', () => {
    const result = add(2, 3);
    expect(typeof result).toBe('number');
  });
});