const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Test if fetchItem is a function', () => {
    expect(typeof(fetchItem)).toBe('function');
  })
  
});
