const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts',  () => {
  it('Testa se a função fecthProducts é uma função', async () => {
    const typeOfFecthProducts = await typeof fetchProducts;
    expect(typeOfFecthProducts).toEqual('function');
  });

  it('Testa se o fetchProducts foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se o endpoint foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador")
  });

  it('Testa se o resultado de fetchProducts é igual ao computadorSearch', async () => {
    await fetchProducts('computador')
    .then((data) => expect(data).toEqual(computadorSearch));
  });

  it('sem parametros retorna erro', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(error);
  });
});
