const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('fetchProducts() tem que ser uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it ('passando o argumento computador a função funciona', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('passando o argumento computador a função traz o endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('testa se o retorno de fetchProducts é igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })
  it('Deve retornar o erro "You must provide an url"', async () => {
    const expectedError = new Error ('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});
