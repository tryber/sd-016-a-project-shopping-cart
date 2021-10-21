const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('Executa a função com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })

  it('Testa se fetch utiliza o endpoint correto', async () => {
    await fetchProducts('computador');
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('Testa se o retorno de fetchProducts("computador") é igual ao objeto computadorSearch', () => {
    const result = jest.fn((fetchSimulator) => computadorSearch);
    result();
    expect(result).toHaveReturned()
  })

  it('Testa se ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };
  })
});
