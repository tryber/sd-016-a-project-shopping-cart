const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('ao executá-la com o argumento MLB1615760527, testa se o fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao executá-la com o argumento MLB1615760527, testa se o fetch usa o endpoint correto', () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(endpoint);
  });
  it('ao executá-la com o argumento MLB1615760527, deve retornar um objeto igual a item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('deve retornar um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});