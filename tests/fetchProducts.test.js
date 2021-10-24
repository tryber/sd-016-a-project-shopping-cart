const { fetchProducts } = require('../helpers/fetchProducts');
const fetchSimulator = require('../mocks/fetchSimulator');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

// Exercícios feitos com base na aula do requisito 1 disponibilizada por Bernado Salgueiro.
describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('testa se featch products é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('verificar se a função fetch products esta sendo chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se o endpoint esta correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('testa se o retorno de fetch products é igual a computadorSearch', async () => {
     const result = await fetchProducts('computador');
     expect(result).toEqual(computadorSearch);
  });
  it('retorna um erro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectError);
  })
});
