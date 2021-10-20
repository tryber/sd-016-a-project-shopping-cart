const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it("fetchProducts é uma funcão", () => {
    expect(typeof fetchProducts === 'function').toBeTruthy();
  })
  it("fetchProducts retorna o resultado esperado quando pesquisa por \"computador\"", () => {
    fetchProducts("computador")
      .then((res) =>
        expect(res).toEqual(computadorSearch)
      );
  });
});
