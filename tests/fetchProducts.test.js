const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it ('Teste se fetchProduts é uma função: ', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it ('Executa a função fetchProducts com o argumento "computador" e teste se fetch', () => {
    fetchProducts('computador');
    // Dica sumo deu mentoria conseguir esse metodo para testar o fetch.
    expect(fetch).toBeCalled();
  });

  it ('Ao chamar a função fetchProducts com o argumento "computador", a função retorna o endpoint', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(endpoint);
  });
});
