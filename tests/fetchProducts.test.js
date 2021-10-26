const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao chamar a função com o argumento computador, testa se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('oa chmá-la com argumento computador, testa se fetche foi chamada com endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('deve retornar um erro', async () => {
    const results = await fetchProducts();
    const expectedError = new Error('You must provide an url')
    expect(results).toEqual(expectedError);
  })
});
