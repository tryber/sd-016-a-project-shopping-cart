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
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Tests if the correct endpoint is added', async () => {
    expect.assertions(1);
    const result =  await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
});
