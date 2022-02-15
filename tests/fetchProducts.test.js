const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao chama-lá com o argumento computador, teste se fetch foi chamada', () => {
    fetchProducts('computador');

    expect(fetch).toHaveBeenCalled();
  });

  it('ao chama-lá com o argumento computador, testa se o fetch foi chamado com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('teste se o retorino da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');

    expect(results).toEqual(computadorSearch);
  });

  it('deve retornar um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});