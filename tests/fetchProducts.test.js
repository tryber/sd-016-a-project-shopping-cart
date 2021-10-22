const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se função fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it("Teste da função fetchProducts, se ela é chamada", async () => {
    expect.assertions(1);
    await fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });
  
  it('Teste da função fetchProducts recebendo parametro', async () => {
    expect.assertions(1);
    await fetchProducts("computador")
    
    expect(fetch).toHaveBeenCalledWith(
      "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    );
  });

  it('Teste da função fetchProducts, se retorna um objeto com os dados da categoria pesquisada', async () => {
    expect.assertions(1);
    // await fetchProducts('computador');
    expect(await fetchProducts("computador")).toEqual(computadorSearch);
  });

  it('Teste da função fetchProducts, retorna erro', async () => {
    
    expect(await fetchProducts()).toBe("You must provide an url");
  });

});
