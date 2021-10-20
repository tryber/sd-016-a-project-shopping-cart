const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts',  () => {
  it('Testa se a função fecthProducts é uma função', async () => {
    const typeOfFecthProducts = await typeof fetchProducts;
    expect(typeOfFecthProducts).toEqual('function');
  })
});
