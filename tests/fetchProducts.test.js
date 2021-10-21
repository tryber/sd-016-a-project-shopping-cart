const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  fetchProducts('computador')
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('Verifica se fetchProducts com o argumento computador é chamada', () => {
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar a função fetchProducts com o argumento, a função fetch utiliza o endpoint', () => {
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador")
  })

  it('Verifica se o retorno da função com o argumento computador é uma estrutura igual ao objeto computadorSearch', async () => {
    const 
    })
  })
});
