const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  test('1- check if fetchItem is a function', async () => {
    expect(typeof (fetchItem)).toBe('function');
  });

  test('2- check if it have a call for fetch on fetchItem with "MLB1615760527" argument ', async () => {

    const response = await fetchItem('MLB1615760527');

    expect(typeof (fetchItem(response))).toBe('object');

  });

  test('3 -check if fetchItem with "MLB1615760527" argument  return the endpoint "https://api.mercadolibre.com/items/MLB1615760527""', async () => {

    const response = await fetchItem('MLB1615760527');
    const { id } = response;

    expect(id).toBe('MLB1615760527');
  });

  test('4- check if fetchItem function with "MLB1615760527" argument returns as same as object item', async () => {

    const response = await fetchItem('MLB1615760527');
    expect(response).toBe(item);

  });

  test('5- check if fetchProducts function with no argument returns the error "You must provide an url" ', async () => {

    try {
      await fetchItem();
    } catch (error){
    expect(error).toEqual(new Error('You must provide an url'));
  }
  });

});
