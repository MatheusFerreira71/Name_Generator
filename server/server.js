const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        prefixes: [Item]
        sufixes: [Item]
    }
`;

const itens = [
    {id: 1, type: "prefix", description: "Pedra"},
    {id: 2, type: "prefix", description: "Papel"},
    {id: 3, type: "prefix", description: "Tesoura"},
    {id: 4, type: "sufix", description: "Cachorro"},
    {id: 5, type: "sufix", description: "Kissaça"},
    {id: 6, type: "sufix", description: "Limbo"},
];

const resolvers = {
    Query: {
        prefixes() {
            return itens.filter(item => item.type === "prefix");
        },
        sufixes() {
            return itens.filter(item => item.type === "sufix");
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();