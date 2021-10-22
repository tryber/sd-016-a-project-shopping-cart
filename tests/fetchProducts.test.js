const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Testa a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fecthProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  }),
    it('Executa a função fecthProducts com o argemneto "computador" e testa se fetch foi chamada.', () => {
      fetchProducts('computador');
      expect(fetch).toHaveBeenCalled();
    }),
    it('Ao chamar a função fetchProducts com o argemneto "computador", a função fetchProducts utiliza o endpoint correto', () => {
      const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      fetchProducts('computador');
      expect(fetch).toHaveBeenCalledWith(endpoint);
    }),
    it('Testa se o retorno da função fetchProducts é uma estrutura de dados igual ao objeto computadorSearch', async () => {
      expect(await fetchProducts('computador')).toBe(computadorSearch);
    })
});
