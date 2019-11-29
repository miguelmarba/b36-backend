/*
Ejemplos

describe('Nombre test', () => {
    it('Prueba especifica de nombre test que va a fallar', () => {
        expect(3).toBe(1);
    });

    it('Prueba especifica de nombre test que va a pasar', () => {
        expect(3).toBe(3);
    });
});

*/

const { graphql } = require('graphql');

const { schema } = require('../../index');

const { createAuthor } = require('../services/AuthorService');

const setupTest = require('./helpers');

const MUTATION_AUTHOR = `
    mutation addAuthor($data: AuthorInput!){
        id,
        emai,
    }
`;

describe('Test Mutation Author', () => {
    beforeEach(async () => await setupTest());

    it('Should create an author', () => {
        const makeTest = async () => {
            const data = {
                first_name : "Prueba",
                last_name : "Prueba",
                email: "prueba@prueba.com",
                password: "prueba"
            };

            graphql(schema, MUTATION_AUTHOR, null, {} ,{ data })
                .then(response =>{
                    expect(response.data.createNewAuthor).toHaveProperty('email', data.email);
                    expect(response.data.createNewAuthor).toHaveProperty('_id');
                });
        };

        makeTest();
    });

    it('Should not create an author', () => {
        const makeTest = async () => {
            const data = {
                first_name : "Prueba",
                last_name : "Prueba",
                email: "prueba@prueba.com",
                password: "prueba"
            };
            
            await createAuthor(data);

            graphql(schema, MUTATION_AUTHOR, null, {} ,{ data })
                .then(response =>{
                    expect(res).toHaveProperty('errors');
                    //expect(response.data.createNewAuthor).toHaveProperty('email', data.email);
                    //expect(response.data.createNewAuthor).toHaveProperty('_id');
                });
        };
    });
});