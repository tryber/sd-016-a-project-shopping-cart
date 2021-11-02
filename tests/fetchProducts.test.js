const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui

  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao chamá-la com o argumento computador, testa se fetch foi chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamá-la om o argumento computador, testa se fecth foi chamada com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('testa se o retrno da função se é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  // it('deve retornar um erro', () => {
  //   const expectError = new Error('you must provide an url');
  //   const results = await fetchProducts();
  //   expect(result).toEqual(expectError);
  // });
});
