const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

  describe('1 - Teste a função fecthProducts', () => {
    // fetchItems('MLB1615760527')
    // cada valor de it foi copiado do README
    it('Testa se fetchItem é uma função', async () => {
      expect.assertions(1);
      const typeOfFetchProducts = typeof fetchItem;
      // tá dando erro no test, fala que é um objeto?
      expect(typeOfFetchProducts).toBe('function');
    });
  
    it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
      expect.assertions(1);
      // haveBennCalled teste se alguma função foi chamada antes
      // na prática fetch sempre é chamado na função, mesmo sem url
      fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled();
    });
  
    it('3 - Teste se, ao chamar a função fetchItem com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
      const argumentOfFetchItems = 'https://api.mercadolibre.com/items/MLB1615760527';
      expect.assertions(1);
      // pega tudo associado ao fetch(url), com a url trocada para a const acima, que é o endpoint
      // toHaveBeenCalledWith --> se alguma função foi chamada com outra
      // https://jestjs.io/pt-BR/docs/expect#tohavebeencalledwitharg1-arg2-
      // feito na sala de estudo em grupo
      expect(fetch).toHaveBeenCalledWith(argumentOfFetchItems);
    });
  
    it('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
      // expectativa de estrutura de dados igual -- toequal
      expect.assertions(1);
      // fetchItem('MLB1615760527').toHaveBeenCalled(async(value) => {
      const fetchProductsURL =  await fetchItem('MLB1615760527');
      // feito a partir do video do Bernardo
      expect(fetchProductsURL).toEqual(item);
      // })
    });
  
    it('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
      const error = new Error ('You must provide an url');
      const result = await fetchItem();
      expect(result).toEqual(error);
  
    });
});
