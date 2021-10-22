const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it("fetchItem é uma função", () => {
    expect.assertions(1);
    expect(typeof fetchItem === 'function').toBeTruthy();
  });

  it("fetch foi chamado", () => {
    expect.assertions(1);
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  it("se o fetch foi chamado com o enpoint", () => {
    expect.assertions(1);
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  it("fetchItem retorna o resultado esperado quando pesquisa por \"computador\"", () => {
    expect.assertions(1);
    return fetchItem("MLB1615760527")
      .then((res) =>
        expect(res).toEqual(item)
      );
  });

  it('se nenhum argumento for passado retorne um erro', async () => {
    expect.assertions(1);
    return fetchItem().catch(e => expect(e).toStrictEqual(Error('You must provide an url')));
  });
});
