const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  
  it ('Verifica se fecthItem é uma função', async () => {
    await fetchItem();
    expect(typeof fetchItem).toBe('function');
  });

  it ('Verifica se a função fetchItem recebe "id" como parametro', async () => {
    await fetchItem('id');
    expect(fetch).toHaveBeenCalled();
  });

  it ('Verifica se a função fetchItem foi chamada com um argumento específico', async () => {
    await fetchItem('id');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/id')
  });

  it ('Verifica se a chamada da função fetchItem("id") retorna uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it ('Verifica se a chamada da função fetchItem() retorna uma mensagem de erro', async () => {
    const error = new Error ('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(error);
  });

});
