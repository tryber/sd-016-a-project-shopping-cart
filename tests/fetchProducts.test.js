const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it(`Testa se fetchProducts é uma função`, () =>{
    expect(typeof fetchProducts).toBe('function')
  });
  it('Testa se fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  });
  it('Testa se fetchProducts é chamado com o endpoint correto', () => {
    const endpoint ='https://api.mercadolibre.com/sites/MLB/search?q=computador' 
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });
  it('Testa se o retorno da funcão é igual a computaodrSearch', async () =>{
    const result = await fetchProducts('computador')
    expect(result).toEqual(computadorSearch)
  });
  it('Testa se fetchProdutcs retorna o erro esperado', async () =>{
    const expectedError = 'You must provide an url';
    await expect(fetchProducts()).rejects.toThrow(expectedError);
  });
});
