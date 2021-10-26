// Feito com o auxilio do vídeo gravado pelo Instrutor Bernardo Salgueiro.
const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada.', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it(`Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch 
  utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador`, () => {
    const verifyEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(verifyEndpoint);
  });

  it(`Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura 
  de dados igual ao objeto computadorSearch, que já está importado no arquivo.`, async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  it(`Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem:
   You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para 
   comparar com o objeto retornado da API.`, async () => {
    const expectedError = new Error('You must provide an url'); 
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
   });  
  });

