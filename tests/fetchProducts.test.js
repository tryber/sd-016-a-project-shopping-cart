const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts must be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('when called with argument computador, test if fetch was called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('when called with argument computador, test if it was called with the correct endpoit', () => {
    const test = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(test);
  });
  it('test if fetchProducts return is an object equal to computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('must return error', async () => {
    const expectedError = new Error('You must provide an url');
    const errorTest = await fetchProducts();
    expect(errorTest).toEqual(expectedError);
  });
});
