const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it('teste se ao chamar fetchItem com parâmetro -MLB1615760527- fetch é chamada', () => {
    fetchItem('MLB1615760527');
expect(fetch).toHaveBeenCalled();
  });

  it('teste se ao chamar fetchItem com parâmetro -MLB1615760527- fetch tem o endPoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('teste se ao chamar fetchItem com parâmetro -MLB1615760527- os dados são os mesmos que item', async() => {
    const result = await fetchItem('MLB1615760527');
expect(result).toEqual(item)
  });

  it('teste se chamar fetchItem sem parâmetros retornar um erro', async () => {
    const error = new Error('You must provide an url')
    const result = await fetchItem();
    expect(result).toEqual(error);
  });
});
