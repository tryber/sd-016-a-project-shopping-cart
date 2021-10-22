const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
   it("Teste se função fetchItem é uma função", () => {
     expect(typeof fetchItem).toBe("function");
   });

   it("Teste se a função fetchItem é chamada", async () => {
    expect.assertions(1);
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
   });
  
   it("Teste se a função fetchItem é chamada", async () => {
    expect.assertions(1);
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
   });

   it('Teste da função fetchItem, se retorna um objeto com dados do item pesquisado', async () => {
    expect(await fetchItem("MLB1615760527")).toEqual(item);
   });

   it('Teste da função fetchItem, se retorna error ao não passar argumento', async () => {
     expect(await fetchItem()).toBe("You must provide an url");
   });
});

