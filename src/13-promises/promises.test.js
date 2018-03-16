import { promiseDef, simplePromise, chamarApiPromise } from './promises';

test('promises def', () => {

    expect(promiseDef).toBeDefined();
    expect(promiseDef.definicoes[0]).toEqual('#mozilla =>A Promise is an object representing the eventual completion or failure of an asynchronous operation');
    expect(promiseDef.definicoes[1]).toEqual('#eduardo => Simboliza algo que vai acontecer no futuro, porém isso pode dar certo ou não');

    expect(promiseDef.vantagens[0]).toEqual('O encadeamento é garantido pelo tipo, e não por callbacks');
    expect(promiseDef.vantagens[1]).toEqual('Tratamento de erros simplificado');
    expect(promiseDef.vantagens[2]).toEqual('Mais fácil de ler e manter o código');
    expect(promiseDef.vantagens[3]).toEqual('Favorece composição do seu código #não garante');

    expect(promiseDef.desvantagens[0]).toEqual('Retorna somente um valor e o seu ciclo de vida acaba (RxJS)');
    expect(promiseDef.desvantagens[1]).toEqual('Não é cancelável (RxJS)');

    expect(promiseDef.observacoes[0]).toEqual('Normalmente nós somos consumidores das promises (fetch, jQuery, middlewares, etc)');
});

/**
 * Fazer junto
 */
test('simple promise chaining', (done) => {
    
    simplePromise('Valor')
           .then( v => console.log('Meu valor ', v))
           .then(() => done());

});

/**
 * Fazer junto
 */
test('simple promise error catching chaining', (done) => {
    simplePromise()
           .then( v => console.log('Meu valor na função com erro ', v))
           .catch(error => console.log('Erro: ', error))
           .then(() => done());
});

/**
 * Exercício 3
 * 
 * Refatorar o exercício dos callbacks (#2) para utilizar Promises conforme exemplo mostrado anteriormente
 */
test('refactoring callback exercise', () => {

    chamarApiPromise('/api/contabil')
            .then(firstResult => {
                console.log('First result: ', firstResult);                
                return firstResult; 
            })
            .then(secondResult => {
                console.log('Second result: ', secondResult);
                return secondResult; 
            })
            .then(thirdResult => {
                console.log('Third result: ', thirdResult);
                return thirdResult; 
            })
            .then(fourthResult => {
                console.log('Fourth result: ', fourthResult);
                return fourthResult; 
            })                                    
            .then(() => done());  

            //sem o catch não apresenta o erro caso ocorra em algum dos then's 
            // o erro é omitido
});

/**
 * Exercício 4
 * 
 * Refatorar o exercício do encadeamento dos callbacks para utilizar o encadeamento das promises.
 */
test('refactoring callback chaining promises', () => {

    chamarApiPromise('/api/contabil')
    .then(firstResult => {
        console.log('First result: ', firstResult);                
        return chamarApiPromise(''); 
    })
    //colocando o retorno chamando o metodo novamente
    .then(secondResult => {
        console.log('Second result: ', secondResult);
        return secondResult; 
    })
    .then(thirdResult => {
        console.log('Third result: ', thirdResult);
        return thirdResult; 
    })
    .then(fourthResult => {
        console.log('Fourth result: ', fourthResult);
        return fourthResult; 
    })                                    
    .catch(error => console.log('Erro: ', error))
    .then(() => done());    

});