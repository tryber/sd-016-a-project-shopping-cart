const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  it('teste se a função fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('teste se fetch foi chamada ao executar a função com o parâmetro', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('teste se ao chamar a função com o argumento, a função utiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('teste se o retorno da função é uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  it('teste se quando a função é chamada sem parametro, é retornado uma mensagem de erro', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(error);
  })
})
