const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {

  it('test if fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  
  it('verifies if fetch is called when running the function fetchProducts("computador")', async () => { 
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifies if fetch uses specific endpoint when running the function fetchProducts("computador")', async () => {
    await fetchProducts('computador'); 
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });

  it('verifies if the return of the function fetchProducts("computador") type is equal to computadorSearch type', async () => { 
    const test = await fetchProducts("computador")
    return expect(test).toEqual(computadorSearch);
  });
  
  it('verifies if fetchProducts when passed with no arguments return an error: "You must provide an url"', async () => {
    const error = new Error('You must provide an url');
    const results = await fetchProducts();
    expect(results).toEqual(error)

  });
});
