const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('1 - Testa se a função fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('2 - Testa se a função fetchItem foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Testa se ao chamar a função fetchItem, com o argumento "MLB1615760527", a função fetch utiliza o endpoint correto', () => {
    const correctEndPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(correctEndPoint);
  });

  it('4 - Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é igual a estrutura de dados do objeto item.', () => {
    fetchItem('MLB1615760527')
      .then((data) => {
        expect(data).toEqual(item);
      })
  });

  it('5 - Testa se ao chamar a função fetchItem, retorna um erro com a mensagem \'You must provide an url\'.', () => {
    expect(() => fetchItem()).toThrow('You must provide an url');
  });  
});
