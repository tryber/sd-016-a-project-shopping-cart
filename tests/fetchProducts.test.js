const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testando se fetchProducts é uma funcao', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Executando a função fetchProducts com o argumento "computador" e testando se fetch foi chamada', () => {
    fetchProducts(fetch, 'computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testando se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    const expectResult = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectResult);
  })

  it('Testando se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo' , async () => {
    const expectedResult = computadorSearch;
    const result = await fetchProducts(fetch, 'computador');
    expect(result).toEqual(expectedResult);
  })

  it('Testando se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchProducts();
    } catch(error) {
      expect(error).toEqual(new Error ('You must provide an url'));
    }
  })
});
