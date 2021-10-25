const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Deve ser uma função:', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Testar se ao chamar o id:"MLB1615760527" fetch será chamada:', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it('Testar se ao usar o argumento "MLB1615760527" fech utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527":', () => {
    const endpoint = `https://api.mercadolibre.com/items/MLB1615760527`;
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Testa se o retorno de fetchItem é uma estrutura de dados igual ao objeto item:', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Testa se o retorno de fetchItem sem argumento é: "You must provide an url":', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(error);
  });
});
