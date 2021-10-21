const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
 
  it('1 - Teste se fetchProducts é uma função;', (done) => {
    try {
      expect(typeof fetchProducts).toBe('function');
      done();
    } catch (err) {
      done(err);
    }
  });

  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })
  
  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador"', async () => {

    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })

  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
      await fetchProducts('computador')
       .then((response) =>
          expect(response).toEqual(computadorSearch)
      );
  })

  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const promisse = await fetchProducts()
    const expected = 'You must provide an url'
    expect(promisse).toEqual(expected)

  })
});
