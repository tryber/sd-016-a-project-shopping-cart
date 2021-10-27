const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('ao chamar a função com o argumento MLB1615760527, testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamá-la com argumento MLB1615760527, testa se fetche foi chamada com endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('testa se o retorno da função é um objeto igual a item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('deve retornar um erro', async () => {
    const results = await fetchItem();
    const expectedError = new Error('You must provide an url')
    expect(results).toEqual(expectedError);
  })
})