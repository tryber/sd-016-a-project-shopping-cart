const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se fecth é chamada na função com o argumento "MLB1615760527"', async () => {
    fetchProducts('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamá-la com o argumento computador, testa se fecth foi chama com o endpoint correto', () => {
    const endpoint =  'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('testa se o retorno da função é i, objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('deve retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  });
});
