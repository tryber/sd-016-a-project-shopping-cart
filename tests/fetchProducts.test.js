const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint desejado', () => {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';  
  fetchProducts('aaa');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async() => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  test(`Teste se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem`, async () => {
    const result = await fetchProducts();
    const expectError = new Error('You must provide an url');
    expect(result).toEqual(expectError);
  });

});
