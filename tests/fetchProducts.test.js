const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toEqual('function');
  });
  it('Testa se a função é chamada com o argumento `computador`', async () => {
    expect.assertions(1);
    await fetchProducts('computador');

    expect(window.fetch).toHaveBeenCalled();
  });
  it('Testa se fetchProducts quando chamada com o argumento `computador`, retorna o endpoint esperado', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    expect(window.fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Testa se fetchProducts retorna a estrutura de dados esperada quando chamada com o argumento `computador`', async () => {
    expect.assertions(1);
    const response = await window.fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const data = await response.json();

    expect(data).toEqual(computadorSearch);
  });
  it('Testa se fetchProducts sem argumentos, retorna um erro', async () => {
    expect.assertions(1);
    const thrownError = new Error('You must provide an url');
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(thrownError);
    }
  });
});
