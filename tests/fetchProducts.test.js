const fetchSimulator = require('../mocks/fetchSimulator');
let { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Testa se fetchProducts é um função', () => {
    expect(typeof fetchProducts).toEqual('function');
  })

  test('Testa se fetch é chamada quando fetchProducts("computador") é chamada', async() => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint: "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  test('Testa se o retorno da função é o esperado', async () => {
    const value = await fetchProducts('computador');
    expect(value).toEqual(computadorSearch);
  })

  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const value = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(value).toEqual(error); // não consigo fazer da throw...
  })
});
