import { expect } from 'chai'

describe('Array test suit', ()=>{
    
    describe('Test that JS sort works good', ()=>{
        it('Should sort array by name', ()=>{
            const names = ['Adiel', 'Tom', 'John']
            expect(names.sort()).to.be.eql(['Adiel', 'John', 'Tom']);
        });
        it('Sort by name', ()=> {
            const array = ['Bob', 'Alice', 'Chris'];
            expect(array.sort()).to.be.eql(['Alice', 'Bob', 'Chris']);
        })
    })
})