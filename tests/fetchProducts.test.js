const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('1 - Verifica se fetchProducts é do tipo função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('1 - Verifica se chamada a função fetchProducts com o argumento "computador", a função fetch é chamada', () => {
  fetchProducts('computador')
  expect(fetch).toHaveBeenCalled();
  });

  it('1 - Verifica se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });

  it('1 - Verifica se ao chamar a função fetchProducts com o argumento "computador", o retorno é equivalente a estrutura contida no objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('1 - Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url" ', async() => {
    try {
      await fetchProducts();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});