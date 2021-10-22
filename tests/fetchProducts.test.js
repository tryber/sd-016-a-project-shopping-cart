const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it ('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it ('Verifica se fetch foi chamado ao executar fetchProducts', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });
  it ('Verifica se, ao chamar fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  it ('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
     expect(await fetchProducts('computador')).toEqual(computadorSearch.results);
  });
  it('Verifica se ao chamar a função fetchProducts sem argumentos retorna uma mensagem de erro', async () => {
    fetchProducts().catch((err) => {
      expect(err).toThrow('You must provide an url');
    });
  });
});
