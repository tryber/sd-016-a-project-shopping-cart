const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const { fetchProducts } = require('../helpers/fetchProducts');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('testa se a função fetchItem com o argumento MLB1615760527 é chamada', () => {
    fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalled();
  });

  it('se ao chamar a função fetchItem com o argumento MLB1615760527, retorna com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchProducts('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
});
