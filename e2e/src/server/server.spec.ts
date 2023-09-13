import axios from 'axios';

describe('Operations', () => {

  const testCases = [
    { endpoint: '/add', a: 5, b: 3, expected: '8' },
    { endpoint: '/subtract', a: 5, b: 3, expected: '2' },
    { endpoint: '/multiply', a: 5, b: 3, expected: '15' },
    { endpoint: '/divide', a: 6, b: 3, expected: '2' },
  ];

  test.each(testCases)(
    'should correctly compute for %s',
    async ({ endpoint, a, b, expected }) => {
      const res = await axios.get(`http://localhost:3000${endpoint}`, {
        params: {
          a: a.toString(),
          b: b.toString(),
        },
      });

      expect(res.status).toBe(200);
      expect(res.data.result).toEqual(expected);
    }
  );
});
