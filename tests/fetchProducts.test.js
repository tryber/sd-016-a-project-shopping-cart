const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se é funcao', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('testa se fetch foi chamado', () => {
    fetchProducts();
    expect(fetch).toHaveBeenCalled();
  });
  it('com o argumento computador, foi chamada com o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
  it('testa se o retorno é correto', async () => {
    const retorno = await fetchProducts('computador');
    expect(retorno).toBe(computadorSearch);
  });
  it('testa se retorna error', async () => {
    const error = await fetchProducts();
    expect(error).toBe('error');
  })
});
