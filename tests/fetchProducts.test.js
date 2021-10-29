const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('espera-se que fetchProducts seja uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao chamar a função fetchProducts("computador"), a função fetch retorna o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('O retorno da função fetchProducts("computador") deve ser igual ao objeto computadorSearch', async () => {
    expect( await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem esperada', async () => {
  expect(await fetchProducts()).toEqual(new Error ('You must provide an url'));
  });
});
