const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('se ao chamar a função fetchProducts("computador"), a função fetch() é chamada', async () => {
    fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamar a função fetchProducts("computador"), a função fetch usa o endpoint ("https://api.mercadolibre.com/sites/MLB/search?q=computador")', async () => {
    const parentFunction = await fetchProducts("computador");
    const childFunction = await fetch("https://api.mercadolibre.com/sites/MLB/search?q=computador");
    
    const data = await childFunction;
    const result = computadorSearch;

    expect(parentFunction).toEqual(result);
    expect(childFunction).toEqual(data);
  });

  it('se o retorno da função fetchProducts("computador") é um objeto igual ao objeto computadorSearch', async () => {
    const parentFunction = await fetchProducts("computador");
    
    const result = computadorSearch;

    expect(parentFunction).toEqual(result);
  });

  it('se a função fetchProducts não tiver argumentos, retorna erro com mensagem "You must provide an url"', async () => {
    // Idéia de lógica vista no slack pelo Ádran Carnavale
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(Error ('You must provide an url'));
    }
  })

  fail('Teste vazio');
});
