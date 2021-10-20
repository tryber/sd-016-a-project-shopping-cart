const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  it('Executa a função fetchProducts com o argumento "computador" e testa se "fetch" foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts(computadorSearch);
    expect(fetch).toHaveBeenCalled();
  });
});
