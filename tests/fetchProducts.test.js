const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const { SearchSource } = require('jest-cli');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('verifica se é uma função',()=>{
    expect(typeof fetchProducts).toEqual('function');
  });

  it('verifica se função é uma promessa',() =>{
    expect(fetchProducts("computador") instanceof Promise).toEqual(true);
  })

  it('verifica se quando passado o argumento computador a função utiliza o endpoint pedido ',() =>{
    expect(fetchProducts("computador")).toEqual(fetch("https://api.mercadolibre.com/sites/MLB/search?q=computador"));
  })

  it('verifica se fetchProducts e computadorSearch são objetos ',() =>{
    expect(typeof fetchProducts("computador")).toEqual(typeof computadorSearch);
  })

  it('verifica se quando não for passado argumento lança um erro com a mensagem you must provide an url ', async() =>{
    const teste = await fetchProducts()
    expect(teste).toEqual(new Error('You must provide an url'));
  })
});
