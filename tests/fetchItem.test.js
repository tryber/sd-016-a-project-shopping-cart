const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it("fetchItem é uma função", () => {
    expect(typeof fetchItem === 'function').toBeTruthy();
  });

  it("fetch foi chamado", () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
});
