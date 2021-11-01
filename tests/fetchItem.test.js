const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('Ao passar MLB1615760527 como argumento, testa se a função fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao passar MLB1615760527 como argumento, testa se a função fetch utiliza o end points https://api.mercadolibre.com/items/MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Ao passar MLB1615760527 como argumento, testa se o retorno é igual ao objeto item'  , async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error ('You must provide an url'));
  });
});
