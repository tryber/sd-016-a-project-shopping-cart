const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('verifica se ao chamar a função com o argumento MLB1615760527 fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('ao chamar a função com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint com id do argumento', () => {
    fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('ao chamar com o mesmo argumento verifica se é uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  it('sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(error);
  })
});
