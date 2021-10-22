const fetchSimulator = require("../mocks/fetchSimulator");
const { fetchItem } = require("../helpers/fetchItem");
const item = require("../mocks/item");

window.fetch = jest.fn(fetchSimulator);

describe("2 - Teste a função fecthItem", () => {
  it("Is a function", () => {
    expect(typeof fetchItem).toBe("function");
  });
  it("Is called", () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it("Uses endpoint", () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('returns correct value', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('returns error with no arguments', async () => {
    const results = await fetchItem();
    const expected = new Error("You must provide an url");
    expect(results).toEqual(expected);
  });
});
