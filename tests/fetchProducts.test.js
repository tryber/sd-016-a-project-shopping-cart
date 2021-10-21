const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  fetchProducts('computador');
  it('1 - Teste de fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  
  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    return expect(fetch).toHaveBeenCalled();
  });
  
  it('3- Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  
  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const result = await fetchProducts('computador')
    expect(result).toEqual(computadorSearch);
  });
  
  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchProducts()
    expect(result).toEqual(error);
  });
});
