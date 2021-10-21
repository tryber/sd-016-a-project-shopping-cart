const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test ('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  });

  test ('Testa se fetch é chamada caso chamado a função fetchProducts(computador)', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test ('Ao chamar fetchProducts(computador) a função usa o endpoint especificado', () => {
    const endpoint =  "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })


});
