const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })

  test("Execute a função fetchItem com o argumento do item 'MLB1615760527' e teste se fetch foi chamada", () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })

  test("Teste se, ao chamar a função fetchItem com o argumento do item 'MLB1615760527', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/items/MLB1615760527'", () => {
    const endpoint =
      'https://api.mercadolibre.com/items/MLB1615760527'
      fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  test("Teste se o retorno da função fetchItem com o argumento do item 'MLB1615760527' é uma estrutura de dados igual ao objeto item que já está importado no arquivo.", async () => {
    const results = await fetchItem('MLB1615760527')
    expect(results).toEqual(item)
  })

  test("Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.", async () => {
    const expectedError = new Error('You must provide an url')
    const results = await fetchItem()
    expect(results).toEqual(expectedError)
  })
});
