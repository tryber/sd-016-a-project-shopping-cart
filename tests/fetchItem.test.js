const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

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
    fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('testa se o retorno de fetchItem(MLB1615760527) é igual ao objeto item (presente no arquivo)', async () => {
    const result = await fetchItem('MLB1615760527');
    
    expect(result).toEqual(item);
  });

  it('se ao chamar fetchItem() retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchItem();
    const error = 'You must provide an url'

    expect(result).toEqual(error);
  });
});