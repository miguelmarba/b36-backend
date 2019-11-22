const { GraphQLServer } = require('graphql-yoga');

/*
    1.- traer solo un usuario
    2.- actualizar un usuario
*/

const typeDefs = `

    type Query{
        hello(name:String):String!
        getUsers:[User]!
        getUser(id:Int!):User
    }

    type Mutation{
        createUser(name:String!, age:Int!):User
        updateUser(name:String!, age:Int!, id:Int!):User
    }

    type User{
        id:Int!
        name:String!
        age:Int!
    }
`;

// Base de datos Users
const users = [];

const resolvers = {
    Query:{
        hello:(root, params, context, info) => `Hola ${params.name}`,
        getUsers:(root, params, context, info)=> users,
        getUser:(root, params, context, info)=> {
            let id = 0;
            users.forEach(function(user, index) {
                if(user.id == params.id){
                    id = index;
                    return;
                }
            });
            if(id != 0){
                return users[id];
            } else {
                const user = {
                    id: params.id,
                    name: "No existe",
                    age: 0
                };
                return user;
            }
        },
    },
    Mutation:{
        createUser:(root, params, context, info) => {
            const user = {
                id: users.length + 1000,
                name: params.name,
                age: params.age
            };
            users.push(user);
            return user;
        },
        updateUser:(root, params, context, info) => {
            let id = 0;
            users.forEach(function(user, index) {
                if(user.id == params.id){
                    id = index;
                    return;
                }
            });
            if(id != 0){
                users[id].name = params.name;
                users[id].age = params.age;
            } else {
                const user = {
                    id: params.id,
                    name: "No existe",
                    age: 0
                };
                return user;
            }
        }
    }
}

// root -> traer la información del servidor graphql
// params -> son los datos que envia el cliente y que se define en nuestro typedefs
// context -> objeto por el cual se comunican los resolvers (Auth)

// Montar servidor


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log("Start!"))
