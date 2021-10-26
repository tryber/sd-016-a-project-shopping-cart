const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// console.log(computadorSearch);
// console.log(fetchProducts('computador'))

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  // fetchProducts('computador')
  // cada valor de it foi copiado do README
  it('Testa se fetchProducts é uma função', async () => {
    expect.assertions(1);
    const typeOfFetchProducts = typeof fetchProducts;
    // tá dando erro no test, fala que é um objeto?
    expect(typeOfFetchProducts).toBe('function');
  });

  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    expect.assertions(1);
    // haveBennCalled teste se alguma função foi chamada antes
    // na prática fetch sempre é chamado na função, mesmo sem url
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    const argumentOfFetchProducts = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect.assertions(1);
    // pega tudo associado ao fetch(url), com a url trocada para a const acima, que é o endpoint
    // toHaveBeenCalledWith --> se alguma função foi chamada com outra
    // https://jestjs.io/pt-BR/docs/expect#tohavebeencalledwitharg1-arg2-
    // feito na sala de estudo em grupo
    expect(fetch).toHaveBeenCalledWith(argumentOfFetchProducts);
  });

  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    // expectativa de estrutura de dados igual -- toequal
    expect.assertions(1);
    // const returnOfFetchProductsComputer = await fetchProducts('computador')
    const FetchProductsComputer =  await fetchProducts('computador');
    // feito a partir do video do Bernardo
    expect(FetchProductsComputer).toEqual(computadorSearch.results);
  });

  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = new Error ('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(error);

  });
});
