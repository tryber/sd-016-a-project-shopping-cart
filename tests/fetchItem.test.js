const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it ('Deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it ('Ao chamá-la com o argumento "MLB1615760527", testa se Fetch foi chamada ', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it ('Ao chama-lá com o argumento "MLB1615760527", testa se fetch foi chamada com o Endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Testa se o retorno da função é um objeto igual a item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });

  it ('Deve retornar um erro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectError);
  });
});
