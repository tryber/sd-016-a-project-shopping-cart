const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('Test if fetchItem is a function', () => {
    expect(typeof (fetchItem)).toBe('function');
  })
  it('Test if fetch is called using parameter MLB1615760527', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('Test if parameter is called in the function', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
  it('Test if fetchItem(MLB1615760527) return correct result',async () => {
    expect(await fetchItem('MLB1615760527')).toBe(item);
  })
  it('Test if fetchItem without parameter returns error "You must provide an url"', async () => {
    const callFetchItem = await fetchItem();
    expect(callFetchItem).toEqual(new Error('You must provide an url'));
  })
});
