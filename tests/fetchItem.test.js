const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('se fetchProducts é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('se ao chamar a função fetchItem("MLB1615760527"), a função fetch() é chamada', async () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamar a função fetchItem("MLB1615760527"), a função fetch usa o endpoint ("https://api.mercadolibre.com/items/MLB1615760527")', async () => {
    const parentFunction = await fetchItem("MLB1615760527");
    const childFunction = await fetch("https://api.mercadolibre.com/items/MLB1615760527");
    
    const data = await childFunction;
    const result = item;

    expect(parentFunction).toEqual(result);
    expect(childFunction).toEqual(data);
  });

  it('se o retorno da função fetchItem("MLB1615760527"), é um objeto igual ao objeto item', async () => {
    const parentFunction = await fetchItem("MLB1615760527");
    
    const result = item;

    expect(parentFunction).toEqual(result);
  });

  it('se a função fetchItem não tiver argumentos, retorna erro com mensagem "You must provide an url"', async () => {
    
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(Error ('You must provide an url'));
    }
  });
  
  fail('Teste vazio');
});
