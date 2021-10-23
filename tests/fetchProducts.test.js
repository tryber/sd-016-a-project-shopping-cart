const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se a função fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it('Execute a função `fetchProducts` com o argumento "computador" e teste se `fetch` foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  })
  it('Teste se, ao chamar a função `fetchProducts` com o argumento "computador", a função `fetch` utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  it('Teste se o retorno da função `fetchProducts` com o argumento "computador" é uma estrutura de dados igual ao objeto `computadorSearch`', async () => {
    expect(await fetchProducts('computador')).toBe(computadorSearch);
  })
  it('Verifica o retorno de um erro', async () => {
    const trowError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(trowError);
  })
});
