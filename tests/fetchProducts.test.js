const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('testa se fecthProducts é uma função fecthProducts', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('testa se fecth é chamada na função fetchProducts com o argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });
  it('ao passar "computador como parâmetro" retorna o esperado', async () => {
    const call = await fetchProducts('computador')
    expect(call).toBe(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const call = await fetchProducts();
    expect(call).toEqual(new Error("You must provide an url"));
  });
});
