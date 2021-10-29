const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const { fetchProducts } = require('../helpers/fetchProducts');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('ao chamá-la com o argumento MLB1615760527, testa se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamá-la com o argumento computador, testa se fetch foi chamda com  o endpoint correto', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('testa se o retorno da função é um objeto igual a item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item)
  });
  it('deve retornar um erro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectError);
  });
});
