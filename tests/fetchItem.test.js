const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Test if fetchItem is a function', () => {
    expect(typeof(fetchItem)).toBe('function');
  }); 
  it('Test if fetchItem with "MLB1615760527" arg, calls fetch function', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  }); 
  it('Test if fetchItem with "MLB1615760527" arg, has a specific URL endpoint', () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  }); 
  it('Test if fetchItem with "MLB1615760527" arg, returns specific object structure', async () => {
    const fechRequire = await fetchItem('MLB1615760527');
    expect(fechRequire).toEqual(item);
  }); 
  it('Test if fetchItem with no arg, returns an error message', async () => {
    const error = new Error('You must provide an url');
    const fechRequire = await fetchItem();
    expect(fechRequire).toEqual(error);
  }); 
});
