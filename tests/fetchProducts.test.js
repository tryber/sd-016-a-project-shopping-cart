const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('fetchProducts is called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetchProducts uses endpoint', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('fetchProducts return correct value', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('returns error with no arguments', async () => {
    const expected = new Error('You must provide an url');
    const results = await fetchProducts();
    expect(results).toEqual(expected);
  });
});
