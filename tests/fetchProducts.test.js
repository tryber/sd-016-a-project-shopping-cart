const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao executar fetchProducts a função fetch deve ser chamada', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamar a função fetchProducts, a função fetch é chamada corretamente com o endpoint', () => {
    const expected =
      'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expected);
  });

  it("ao chamar a função fetchProducts com o argumento 'computador', deve retornar a mesma estrutura de dados de 'computadorSearch'", async () => {
    const result = await fetchProducts('computador');
    expect(result[0]).toEqual(computadorSearch.results[0]);
  });

  it('ao chamar a função fetchProducts sem argumento, deve retornar um erro', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});
