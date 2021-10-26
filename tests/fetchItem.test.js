const fetchSimulator = require('../mocks/fetchSimulator');
const {
  fetchItem,
} = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('ao chamá-la com o argumento, testa se fetch foi chamada', async () => {
    await fetchItem('"MLB1615760527"');
    expect(fetch).toHaveBeenCalled();
  })

  it('ao chamá-la com argumento, testa se fetch utiliza o endpoint certo', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('se o retorno da função é um objeto igual a item', async () => {
    const result = await fetchItem("MLB1615760527");
    expect(result).toEqual(item);
  })

  it('verifica se retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  })
});
