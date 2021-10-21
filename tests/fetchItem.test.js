const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se fetch foi chamada na função fetchItem com argumento MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se o endpoint utilizado está correto', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Verifica se o retorno da função fetchProducts com o argumento MLB1615760527 é igual ao objeto computadorSearch', async () => {
    const computer = await fetchItem('MLB1615760527');
    expect(computer).toEqual(item);
  });
  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna uma mensagem de erro', () => {
    expect(fetchItem).toThrow(new Error('You must provide an url'));
  });
});
