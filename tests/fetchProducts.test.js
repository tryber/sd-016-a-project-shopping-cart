const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
 it('must be a function' , () => {
   expect (typeof fetchProducts).toBe('funtion');
 });
  it('ao chamá-la com o argumento computador, testa se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('teste se com argumento computador, se fetch usou o endpoint correto', () => {
    const endpoint ='https://api.mercadolibre.com/sites/MLB/search?q=${product}'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })
  it ('testa se o retorno da função é um objeto igual a computadorSearch' , async () => {
    const results = await fetchProducts(computador)
    expect(results).toEqual(computadorSearch)
  });
  it ('testa se sem nenhum argumento retorna erro' , async () => {
    const expectedError = new Error ('You must provide an url')
    const result = await fetchProducts ();
    expect(result).toEqual(expectedError) 

  })
});
