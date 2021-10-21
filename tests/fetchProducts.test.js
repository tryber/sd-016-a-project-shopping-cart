const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
 it('Teste se fetchProducts() é uma função', () => {
   expect(typeof fetchProducts).toBe('function');
  });
 it('Teste se ao passar o argumento computador para fetchProducts, fetch é chamada', () => {
   fetchProducts('computador');
   expect(fetch).toHaveBeenCalled();
 });
 it('Teste se ao chamar a função fetchProducts com o argumento computador ela é chamada com o endpoint correto', () => {
   const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
   fetchProducts('computador');
   expect(fetch).toHaveBeenCalledWith(endpoint);
 });
 it('Teste se o retorno da função fetchProducts é um objeto igual a computadorSearch', async () => {
   const results = await fetchProducts('computador');
   expect(results).toEqual(computadorSearch.results);
 });
 it('Teste se ao chamar a função fetchProducts sem argumento ela retorna um erro', async () => {
   const expectedError = new Error('You must provide an url');
   const result = await fetchProducts();
   expect(result).toEqual(expectedError);
 })
});
