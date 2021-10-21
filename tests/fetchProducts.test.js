const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verificando se fetchProducts é do tipo funcao', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testando o fetch em fetchProducts', async() => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verificando se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async() => {
    const args = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(args);
  });

  it('Verificando se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async() => {
    const theFetch = await fetchProducts('computador');
    expect(theFetch).toEqual(computadorSearch.results);
  })
});
