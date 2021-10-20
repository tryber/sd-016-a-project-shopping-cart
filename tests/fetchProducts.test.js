const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função', () => {
    const expectedResult = 'function';
    expect(typeof fetchProducts).toBe(expectedResult);
  })

  it('Verifica se, ao executar a função fetchProducts com o argumento "computador", a função "fetch" será chamada', () => {
    fetchProducts(fetch, 'computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    const expectedArgument = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts(fetch, 'computador');
    expect(fetch).toHaveBeenCalledWith(expectedArgument);
  })
});
