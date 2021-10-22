const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('This is a function', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toEqual('function');
  });

  it('call with argument `MLB1615760527`', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(window.fetch).toHaveBeenCalled();
  });

  it('when we call the argument `MLB1615760527`, uses the expected endpoint', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(window.fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Returns the expected data structure when called with the argument `MLB1615760527`', async () => {
    expect.assertions(1);
    const response = await window.fetch('https://api.mercadolibre.com/items/MLB1615760527');
    const data = await response.json();
    expect(data).toEqual(item);
  });

  it('no arguments, returns an error', async () => {
    expect.assertions(1);
    const thrownError = new Error('You must provide an url');
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(thrownError)
    }
  });
});