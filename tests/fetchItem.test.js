const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  const sum = (a, b) => a + b;

test('sums two values', () => {
  expect(sum(2, 3)).toEqual(5);
});
  fail('Teste vazio');
});
