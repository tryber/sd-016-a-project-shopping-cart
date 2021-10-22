const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

beforeEach(() => {
  fetch.mockClear();
})

describe('2 - Teste a função fecthItem', () => {
  it('Test if fetchItem is a function', () => {
    expect(typeof(fetchItem)).toBe('function');
  })
  it('Test if fetch is called using parameter MLB1615760527', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});
