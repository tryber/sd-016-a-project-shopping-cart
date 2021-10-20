const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('Testa se fetchProducts é uma função', () => {

    expect(typeof fetchProducts).toBe('function');
  })

  it('Executa a função fetchProducts com o argumento "computador" e testa se fetch foi chamada', () => {

    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});
