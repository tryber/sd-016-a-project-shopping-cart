const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Testa se fetchItems é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se fetch é chamado ao buscar pelo ID na fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se ao chamar a função fetchItem com um ID especifico o fetch é feito com base neste ID', async () => {
    const expectedFetch = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectedFetch);
  });

  it('Testa se o retorno da função fetchItem é igual a constante item', async () => {
    const returnFetchItem = await fetchItem('MLB1615760527');
    expect(returnFetchItem).toEqual(item);
  });

  it('Testa se ao chamar a função fetchItem sem argumento o retorno é um erro especifico', async () => {
    const throwTest = await fetchItem();
    expect(throwTest).toEqual(new Error ('You must provide an url'));
  })
});
