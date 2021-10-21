const fetchSimulator = require('../mocks/fetchSimulator');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('dsf', async () => {
  fetchSimulator(computadorSearch, 'fetchProducts');
  const { fetchProducts } = require('../helpers/fetchProducts');

  const fecthProductsTest = await fetchProducts();
  const fetchProductsComputador = await fetchProducts('computador');
  expect(typeof fecthProductsTest).toBe('function');
  expect(fetchProductsComputador).toHaveBeenCalled();
  expect(fetchProductsComputador).toEqual(computadorSearch);
  expect(fetchProductsTest).toThrowError(new Error('You must provide an url'))
  });
});
