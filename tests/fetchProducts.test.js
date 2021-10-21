const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search'); 

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('passando o argumento computador, verifica se fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('passando o argumento computador, a função fetch utiliza o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=computador`)
  });
  it('passando o argumento computador, verifica se o retorno é um objeto igual a computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });


  it('passando a função sem argumento retorna um erro', async () => {
    const expectedResult = new Error('You must provide an url');
    const functionCall = await fetchProducts();
    expect(functionCall).toEqual(expectedResult);
  });
});
