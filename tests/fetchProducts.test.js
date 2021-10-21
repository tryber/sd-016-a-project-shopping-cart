const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  fetchProducts('computador')
  // implemente seus testes aqui
  it('1 - Teste se fetchProducts é uma função;' , () => {
    expect(typeof fetchProducts).toBe('function') 
  })
});

it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', () => {
  expect(fetch).toHaveBeenCalled();
});

it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', () => {
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
});

it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', () => {
  fetchProducts('computador').then(async(value) => {
    const results = await fetchProducts('computador')
    expect(results).toEqual(computadorSearch)
  })
});

it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error(mensagem esperada aqui) para comparar com o objeto retornado da API.', async() => {
  const error = new Error ('You must provide an url');
  const result = await fetchProducts();
  expect(result).toEqual(error);
});

// 1 - Teste se fetchProducts é uma função;

// 2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;

// 3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";

// 4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.

// 5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.

// Use o comando npm test para verificar se seus testes estão passando.

// OBS: Você deve implementar os 5 requisitos, independente do que for suficiente para a cobertura de testes.