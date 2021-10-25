const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('Verifica se fetchProducts é uma função ', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Se teste foi chamado ', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('Se foi chamado com endpoint ', () => {
    const endpoint =
      'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  test('Se o retorno do objeto é igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  test('Se retorna erro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectError);
  });
});
