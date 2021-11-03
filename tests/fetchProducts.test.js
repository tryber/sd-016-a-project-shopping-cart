const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se `fetchProducts` é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Teste se `fetch` foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('Teste se, ao chamar a função com o argumento "computador", utiliza o endpoint correto', () => {
    fetchProducts('computador');  
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
  it('Teste se o retorno da função com o argumento "computador" é correto', async () => {
    const func = await fetchProducts('computador');
    expect(func).toBe(computadorSearch);
  })
  it('Teste se, ao chamar a função `fetchProducts` sem argumento, retorna um erro', async () => {
    const expectError = new Error('You must provide an url');
    const func = await fetchProducts();
    expect(func).toEqual(expectError);
  })
});
