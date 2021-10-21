const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  
  it('Testa de fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Passando o argumento computador, testa se fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Com argumento computador, se a função usa o endpoint', () => {
    const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Se o retorno possui estrutura igual a computadorSearch', async () => {
    const executeFunction = await fetchProducts('computador');
    expect(executeFunction).toEqual(computadorSearch);
  })

  it('Retorna erro ao não receber argumentos', async () => {
    const expectedError = new Error ('You must provide an url');
    const executeFunction = await fetchProducts();
    
    expect(executeFunction).toEqual(expectedError);
  })
});
