const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('if its a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('by calling it with the argument computador it tests whether fetch was called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('when calling it with the computador argument uses the correct endpoint', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('if the functions return is an object equal to computadorSearch', async () => {
    const results =  await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('should return an error', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  });
});
