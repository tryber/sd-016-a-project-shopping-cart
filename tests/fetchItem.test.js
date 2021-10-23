const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it ('É esperado que fetchItem seja uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it ('Verifica se a função fetchItem é chamada quando o parametro MLB1615760527 é passado', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });

  it ('Verifica se, chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  it ('Verifica se o retorno da função fetchItem com o argumento "MLB1615760527" é um objeto igual à computadorSearch', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Verifica se ao chamar a função fetchItem sem argumentos retorna uma mensagem de erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });

});
