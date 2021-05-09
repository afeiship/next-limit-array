(function () {
  const NxLimitArray = require('../src');

  describe('NxLimitArray.methods', function () {
    test('init', function () {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const limitArray = new NxLimitArray(data, { limit: 3 });
      expect(limitArray.length).toBe(3);
    });
  });
})();
