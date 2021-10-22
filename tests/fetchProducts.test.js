const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste se a fecthProducts é uma função', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('testa se ao chamar a função com argumento computador, fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se a função ao ser chamada c o argumento computador,testa se foi chamada com o endpoint' , () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it ('testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it ('se ao chamar a função sem argumentos ela retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  });
});
