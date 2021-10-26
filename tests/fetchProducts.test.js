const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('verifica se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('ao chamá-la com o argumento computador, testa se fetch foi chamada', () => {
  fetchProducts('computador');
  expect(fetch).toHaveBeenCalled();
  })
  it('ao chamá-la com argumento computador, testa se fetch utiliza o endpoint certo', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it('se o retorno da função é um objeto igual a computador search', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })
  it('verifica se retorna um erro', async() => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});
