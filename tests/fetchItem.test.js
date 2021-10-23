const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it("deve ser uma funçao", () => {
    expect(typeof fetchItem).toBe("function");
  });
  it('ao chamá-la com o argumento "MLB1615760527", testa se fetch foi chamada', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamá-la com o argumento "MLB1615760527", testa se fetch foi chamada com endpoint correto', () => {
    const endpoint =
    "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('se o retorno da  funçao é um objeto igual a "MLB1615760527"', async () => {
    const results = await fetchItem("MLB1615760527");
    expect(results.id).toBe("MLB1615760527");
  });
  it("deve retornar  um erro", async () => {
    const expectedError = new Error("You must provide an url");
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});
