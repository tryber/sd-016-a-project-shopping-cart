const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Se fetchProducts é uma função', () => {
    expect(typeof  fetchProducts).toBe('function');
  });
  test('Se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  test('Executa a função com parametro "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
  test('Se o retorno é um objeto', async () => {
    const getObj = await fetchProducts('computador');
    expect(getObj).toEqual(computadorSearch);
  })
  test('A mensagem de erro retornada', async () => {
    const paramVazio = await fetchProducts();
    const erroTest = new Error('You must provide an url');
    expect(paramVazio).toEqual(erroTest);
  })
});
