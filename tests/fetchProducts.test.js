const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

/**
 * Consultei o vídeo gravada pelo Bernardo Salgueiro para resolver essa parte.
 * Link- https://app.slack.com/client/TMDDFEPFU/C02A8CKT31U/thread/C02A8CKT31U-1634781501.006900
**/

describe('1 - Teste a função fecthProducts', () => {
 it('teste se fetchproducts é uma função', () => {
   expect(typeof fetchProducts).toBe('function');
 });

 it('execute fetchProduct com parâmetro -computador- e veja se fech foi chamada', () => {
   fetchProducts('computador');
  expect(fetch).toHaveBeenCalled();
 });

 it('teste se chamar fetchProduct com parâmetro -computador- fetch tem o mesmo endpoind', () => {
  fetchProducts('computador');
  const endPoind = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
  expect(fetch).toHaveBeenCalledWith(endPoind);
 });

 it('teste se chamar fetchProduct com parâmetro -computador- o retorno é igual a computadorSearch', async () => {
   const result = await fetchProducts('computador');
   expect(result).toEqual(computadorSearch);
 })

 it('teste se chamar fetchProduct sem parametro retornar um erro', async () => {
const error = new Error('You must provide an url')
const result = await fetchProducts();
expect(result).toEqual(error);
 });
});
