const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it ('É esperado que fetchProducts seja uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });

  it ('Verifica se a função fetchProducts é chamada recebendo como parâmetro a palavra computador', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });
  it ('Verifica se, ao chamar fetchProducts com o argumento "computador", a função utiliza o endpoint correto "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });

  // fail('Teste vazio');
});
