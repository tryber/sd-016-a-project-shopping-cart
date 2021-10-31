const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('ao executá-la com o parâmetro computador, testa se o fetch foi retornado', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('ao executá-la com o parâmetro computador, testa se o fetch retorna o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toBeCalledWith(endpoint);
  });
  it('testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('caso fetchProduct for chamada sem argumento, retorne um erro', async () => {
    const expectedError = new Error('You must provide an url');
    result = await fetchProducts();
    expect(result).toEqual(expectedError);
  });
});
