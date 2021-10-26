const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(endPoint)
  });

  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item.', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  test(`Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.`, async () => {
    const resultError = await fetchItem();
    const error = new Error('You must provide an url');
    expect(resultError).toEqual(error);
  });
});
