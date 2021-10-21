const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
 it('verifica se é função', () => {
   expect(typeof fetchProducts).toBe('function')
 });
 it('Ao chamar a função com o parâmetro computador testa se fetchProducts foi chamada', () => {
   fetchProducts('computador');
   expect(fetch).toHaveBeenCalled()
 });
 it('Ao chamar a função com o parâmetro computador testa se fetchProducts foi chamada com o end point correto', () => {
   const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
   fetchProducts('computador');
   expect(fetch).toHaveBeenCalledWith(endPoint);
 });
 it('Testa se a função retorna um objeto igual ao computadorSearch', async () => {
   const result = await fetchProducts('computador');
   expect(result).toEqual(computadorSearch);
 });
 it('Testa se retorna um erro', async () => {
   const results = await fetchProducts();
   const expectErro = new Error ('You must provide an url');
   expect(results).toEqual(expectErro);
 }); 
});


