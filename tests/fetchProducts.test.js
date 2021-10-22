const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao chama-la com argumento computador, testa se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamala-la com argumento computador, testa se fetch foi chamada com endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('deve retornar um erro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectError);
  });
});
