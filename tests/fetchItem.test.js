const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem must be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('test if it was called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('when called with argument MLB1615760527, test if fetch used the correct endpoint', () => {
    const test = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(test);
  });
  it('test if fetch returns an object with the same structure as item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('test if fetchItem is called without an argument, it return error msg', async () => {
    const error = new Error('You must provide an url');
    const errorTest = await fetchItem();
    expect(errorTest).toEqual(error);
  });
});
