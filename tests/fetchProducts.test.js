const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fecthProducts retorna uma funcao', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador')
    const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador')
    expect(result).toEqual(computadorSearch)
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchProducts()
    const erro = new Error('You must provide an url')
    expect(result).toEqual(erro)
  });
  });
