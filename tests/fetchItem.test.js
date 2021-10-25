const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste se fetchItem é uma função', () => {
  fetchItem('MLB1615760527');
  it('Teste se fetchItem é uma função;', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    return expect(fetch).toHaveBeenCalled();
  });
  
  it('3- Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  
  it('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
  });
  
  it('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchItem()
    expect(result).toEqual(error);
  });
});
