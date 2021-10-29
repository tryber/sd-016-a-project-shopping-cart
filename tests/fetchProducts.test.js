const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

//referência matchers da documentação no README do projeto: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled

describe('1 - Teste a função fecthProducts', () => {
  it('Se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Se com o argumento "computador" fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Se com o argumento "computador", a função fetch utiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Se o retorno com o argumento "computador" é igual ao objeto computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('Se ao chamar a função sem argumento, retorna o erro esperado', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  });
});
