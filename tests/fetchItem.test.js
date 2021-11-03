const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  fetchItem('MLB1615760527')
  test('Fetch item é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', () => {
    expect(fetch).toHaveBeenCalled()
  })
  test('a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
  test('fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const results = await fetchItem('MLB1615760527')
    expect(results).toEqual(item)
  })
 test('ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
      const expectedError = new Error('You must provide an url')
      const result = await fetchItem();
      expect(result).toEqual(expectedError);
    })
});
