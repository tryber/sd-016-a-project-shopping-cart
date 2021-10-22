const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('verifica se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })

  it('verifica se ao chamar a função fetchItem com argumento "MLB1615760527", fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('ao chamar fetchItem com o argumento "MLB1615760527", verifica se fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const expectResult = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectResult);
  })

  it('verifica se ao retornar fetchItem com o argumento "MLB1615760527" é igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  it('verifica se ao retornar fetchItem sem argumento, retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});
