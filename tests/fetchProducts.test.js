const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

console.log(fetchSimulator('https://api.mercadolibre.com/items/MLB1615760527'));

describe('1 - Teste a função fecthProducts', () => {

  it('Testa se é uma função', () => {

    expect(typeof fetchProducts).toBe('function');
  })

  it('Executa a função com o argumento "computador" e testa se fetch foi chamada', () => {

    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa endpoint de fetch com o argumento "computador"', () => {


  })
});
