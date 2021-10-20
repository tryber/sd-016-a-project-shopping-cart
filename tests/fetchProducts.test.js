const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Tests if fetchProducts is a function', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Tests if fetch is correctly called', async () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
});
