const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('Verifica se `fetchProducts()` é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });
  test('Verifica se a função fetch foi chamada ao executar `fetchPRoducts(computador)`', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('Verifica se ao chamar a função `fetchPRoducts(computador)` a função `fetch` utiliza o endpoint correto', () => {
    const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  test('Testa se o retorno de `fetchProducts(computador)` é igual o objeto `computadorSearch`', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  });
  test('Testa se ao chamar `fetchProducts()` sem argumentos, retorna um erro com a mensagem `You must provide an url`', async () => {
    const erro = new Error('You must provide an url');
    const func = await fetchProducts();
    expect(func).toEqual(erro);
  });
});
