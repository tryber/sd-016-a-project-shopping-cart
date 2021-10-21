const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('test if fetchItem is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('test if the function fetchItem with an argument was called', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it('test if the fetch function uses the endpoint', () => {
    fetchItem("MLB1615760527");
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('test if the function return a data igual to obj item', async () => {
    const result = await fetchItem("MLB1615760527");
    expect(result).toEqual(item);
  })
  it('test if the function return error', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectError);
  })
});
