const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it("fetchProducts é uma funcão", () => {
    expect(typeof fetchProducts === 'function').toBeTruthy();
  });

  it('fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('se o fetch foi chamado com o enpoint', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });

  it("fetchProducts retorna o resultado esperado quando pesquisa por \"computador\"", () => {
    fetchProducts("computador")
      .then((res) =>
        expect(res).toEqual(computadorSearch)
      );
  });

  it('se nenhum argumento for passado retorne um erro', async () => {
    expect.assertions(1);
    return fetchProducts().catch(e => expect(e).toStrictEqual(Error('You must provide an url')));
  });
});
