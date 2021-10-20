const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

beforeEach(() => {
  fetch.mockClear();
});

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  const parameterPC = 'computador';
  it('Test if fetchProducts is a function', () => {
    expect(typeof (fetchProducts)).toBe('function');
  })
  it('Test if fetchProducts(computador) calls fetch', async () => {
    fetchProducts(parameterPC);
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Test if parameter is called in the function', () => {
    fetchProducts(parameterPC);
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('Test if fetchProducts(computador) equals to computadorSearch', async () => {
    const products = await fetchProducts(parameterPC);
    expect(products).toBe(computadorSearch);
  })

  it('Test if fetchProducts() equals to error(You must provide an url)', async () => {
    try {
      await fetchProducts();
    } catch (e) {
      expect(e).toEqual(new Error('You must provide an url'));
    }

  })

});