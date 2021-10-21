const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(fetchItem).toBeInstanceOf(Function);
  })

  it('Verifica se ao chamar a função fetchItem com argumento "MLB1615760527", fetch foi chamada', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Ao chamar fetchItem com o argumento "MLB1615760527", verifica se fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    const expectResult = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectResult);
  })

  it('Verifica se ao retornar fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  it('Verifica se ao retornar fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  })
});
