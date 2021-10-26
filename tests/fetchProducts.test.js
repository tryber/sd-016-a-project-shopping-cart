const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');


window.fetch = jest.fn(fetchSimulator);


describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('testes se fecthProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  /*it('testes a função fecthProducts com o agumento computador e teste se fetch foi chamado', async () => {    
    const teste = fetchProducts('computador');
    const sim = await fetchSimulator('computador');
    expect(teste).toEqual(sim.json());
  }  
  )*/
  it('Teste a função fecthProducts com o argumento computador e teste se fetch foi chamado', async () => {    
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  }  
  )
  it('Teste se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {    
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  }  
  )
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {    
    const retur = await fetchProducts('computador');
    expect(retur).toMatchObject(computadorSearch.results);
  }
   ) 
   it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {    
    const err = new Error('You must provide an url')
    const dados = await fetchProducts();
    expect(dados).toEqual(err);
  }
   ) 
  
  //fail('Teste vazio');
});
