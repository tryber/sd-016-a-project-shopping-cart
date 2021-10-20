const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
// const { fetchProducts } = require('../helpers/fetchProducts');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

});
