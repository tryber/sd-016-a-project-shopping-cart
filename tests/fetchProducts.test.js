const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  fetchProducts('computador');
  test('testa se a fetchItem é uma função.', async () => {
   expect(typeof fetchProducts).toBe('function');
  })
  test('chamar a função fetchProducts(computado) e veja se fetch foi chamado', () => {
    expect(fetch).toHaveBeenCalled();
  })
  test('3', async () => {
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  test('4', async () => { 
    const results = await fetchProducts('computador')
    expect(results).toEqual(computadorSearch)
  })
  test('5', async () => {
    const expectedError = new Error('You must provide an url')
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});