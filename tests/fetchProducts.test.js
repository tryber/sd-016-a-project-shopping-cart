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
});
