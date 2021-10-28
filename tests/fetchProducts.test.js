const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('must be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Calling fetchProducts with "computador" as argument must return fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('Calling fetchProducts with "computador" as argument must use the endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('The return of fetchProducts with "computador" as argument must an object equal as "computadorSearch" ', async () => {
    const resultsofFetch = await fetchProducts('computador');
    expect(resultsofFetch).toEqual(computadorSearch);
  })
  it('Calling fetchProducts without argument must return an error with message "you must provide an url"', async () => {
    const expectedError = new Error('You must provide an url');
    const errorOfFetch = await fetchProducts();
    expect(errorOfFetch).toEqual(expectedError);
  })
});
