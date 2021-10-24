const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Deve ser um function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Ao chamá-la com o argumento computador, testa se fetch foi chamada.', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao chamá-la com o argumento computador, testa se o fetch foi chamada com o endpoint correto.', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('Testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toBe(computadorSearch);
  });

  it('Deve retornar um erro', async () => {
    const result = await fetchProducts();
    const expectedError = new Error('You must provide an url');
    expect(result).toEqual(expectedError);
  })
});
