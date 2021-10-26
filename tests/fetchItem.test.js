const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem e uma funcao.', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it('Testa se a funcao fetch foi chamada.', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled(); 
  });

  it('Verifica se chamada com o item MLB1615760527 o endPoint corresponde.', () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Testa se o retorno da funcao fetchItem tem o tamanho do item da API', async () => {
    const idTest = 'MLB1615760527';
    const lengthReturnFunc = await fetchItem(idTest).then((data) => data);
    expect(item).toEqual(lengthReturnFunc);
  });
 
  it ('Se a chamada da função fetchItem retorna uma mensagem de erro', async () => {
    const error = new Error ('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(error);
  });

});
