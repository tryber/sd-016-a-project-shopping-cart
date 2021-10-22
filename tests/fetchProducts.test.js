const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it ('É esperado que fetchProducts seja uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  // fail('Teste vazio');
});
