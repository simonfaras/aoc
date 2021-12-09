const { getDistance } = require('./puzzle');

describe('getDistance', () => {
  it('should handle one 0 coord', () => {
    const [a, b] = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
    ];

    expect(getDistance(a, b)).toEqual(10);
  });

  it('should handle both coords having values', () => {
    const [a, b] = [
      { x: 10, y: 15 },
      { x: 5, y: 20 },
    ];

    expect(getDistance(a, b)).toEqual(10);
  });
});
