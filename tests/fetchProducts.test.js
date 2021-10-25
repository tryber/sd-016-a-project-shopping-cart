const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao chamar com o argumento computador, testar SE fetch foi chamada:', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar com o argumento computador, testa se fetch foi chamada com o endpoint correto:', () => {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('se o retorno é um objeto igual a computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('retorno de erro', async () => {
    const error = new Error('You must provide an url')
    const result = await fetchProducts();
    expect(result).toEqual(error);
  });
});
