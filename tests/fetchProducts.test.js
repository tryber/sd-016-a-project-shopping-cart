const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  
  test('Teste se `fetchProducts` é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  test('Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  test('Teste se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    const endpoint =
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  test('Teste se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const response = await fetchProducts('computador')
    expect(response).toEqual(computadorSearch)
  })

  test("Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.", async () => {
    const expectedError = new Error('You must provide an url')
    const response = await fetchProducts()
    expect(response).toEqual(expectedError)
  })
});
