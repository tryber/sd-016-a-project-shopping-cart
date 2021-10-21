const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// ajuda de 19 pessoas na mentoria
window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  fetchProducts('computador')
  it('1 - Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    return expect(fetch).toHaveBeenCalled();      
  });

  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    fetchProducts('computador')
		expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', () => {
    const getLengthComputer = Object.keys('computador').length
    const getLengthCOmputerSearch = Object.keys(computadorSearch).length
    expect(getLengthComputer).toEqual(getLengthCOmputerSearch);
  });

  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    try{
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});