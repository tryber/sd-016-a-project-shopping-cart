const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Test if fetchProducts is a function', () => {
    expect(typeof(fetchProducts)).toBe('function');
  }); 
  it('Test if fetchProducts with "computador" arg, calls fetch function', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  }); 
  it('Test if fetchProducts with "computador" arg, has a specific URL endpoint', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  }); 
  it('Test if fetchProducts with "computador" arg, returns specific object structure', async () => {
    const fechRequire = await fetchProducts('computador');
    expect(fechRequire).toEqual(computadorSearch);
  }); 
  it('Test if fetchProducts with no arg, returns error message', async () => {
    const error = new Error('You must provide an url');
    const fechRequire = await fetchProducts();
    expect(fechRequire).toEqual(error);
  }); 
});
