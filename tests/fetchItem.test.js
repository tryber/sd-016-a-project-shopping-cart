const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem é do tipo function', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Ao chamar fetchItem("MLB1615760527"), fetch deverá ser chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled()
  })
  it('Ao chamar fetchItem("MLB1615760527"), fetch deverá utilizar o endpoint passado abaixo', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  it('Ao chamar fetchItem("MLB1615760527"), o retorno deve ser igual ao objeto item',async () => {
    const actual = await fetchItem('MLB1615760527')
    expect(actual).toEqual(item)
  })
  it('Testa se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const expectedError = new Error('You must provide an url');
    const actual = await fetchItem();
    expect(actual).toEqual(expectedError);
  })
});
