const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('fecthItem must be a function', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Calling fetchItem with "MLB1615760527" as argument must return fetch', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('Calling fetchItem with "MLB1615760527" as argument must use the endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('The return of fetchItem with "MLB1615760527" as argument must be an object equal as "item"', async () => {
    const resultOfFetch = await fetchItem('MLB1615760527');
    expect(resultOfFetch).toEqual(item);
  })
  it('Calling fetchItem without argument must return an error with message "You must provide an url"', async () => {
    const expectedError = new Error('You must provide an url');
    const errorOfFetchItem = await fetchItem();
    expect(errorOfFetchItem).toEqual(expectedError);
  })
  
});
