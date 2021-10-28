const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao chamá-la com o argumento MLB1615760527, testa se fetch foi chamada', () => {
    fetchProducts('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamá-la com o argumento MLB1615760527, testa se fetch foi chamada com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    fetchProducts('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
});
it('testa se o retorno da função é um objeto igual a item', async () => {
  const results = await fetchItem('MLB1615760527');
  expect(results).toEqual(item);
});
it('deve retornar um erro', async () => {
  const expectedError = new Error('You must provide an url');
  const result = await fetchItem();
  expect(result).toEqual(expectedError);
});
});