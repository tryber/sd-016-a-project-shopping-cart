const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Ao ser passado o argumento "computador", espera que a função fetch seja chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  }); 
  it('Ao ser chamada com o argumento "computador" que seja chamada com o endpoint esperado', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Ao ser chamada com o argumento "computador" a função retorna a estrutura de dados esperada', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Ao ser chamada sem argumentos retorna o erro esperado', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  }); 
});
