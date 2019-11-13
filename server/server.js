const { ApolloServer } = require("apollo-server");
const dns = require('dns');

const typeDefs = `
    type Item {
        id: Int
        type: String
        description: String
    }

    type Domain { 
        name: String
        url: String
        available: Boolean
        extension: String
    }

    type Query {
        itens(type: String): [Item]
    }

    input itemInput {
        type: String
        description: String
    }

    type Mutation {
        saveItem(item: itemInput) : Item
        deleteItem(id: Int): Boolean
        generateDomains: [Domain]
        generateDomain(name: String): [Domain]
    }
`;

const itens = [
    { id: 1, type: "prefix", description: "Pedra" },
    { id: 2, type: "prefix", description: "Papel" },
    { id: 3, type: "prefix", description: "Tesoura" },
    { id: 4, type: "sufix", description: "Cachorro" },
    { id: 5, type: "sufix", description: "Kissaça" },
    { id: 6, type: "sufix", description: "Limbo" },
];

const isDomainAvailable = (url) => {
    return new Promise((resolve, reject) => {
        dns.resolve(url, (error) => {
            if (error) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

const resolvers = {
    Query: {
        itens(_, args) {
            return itens.filter(item => item.type === args.type);
        }
    },
    Mutation: {
        saveItem(_, args) {
            const item = args.item;
            item.id = Math.floor(Math.random() * 1000);
            itens.push(item);
            return item;
        },
        deleteItem(_, args) {
            const id = args.id;
            const item = itens.find(item => item.id === id);
            if (!item) return false;
            itens.splice(itens.indexOf(item), 1);
            return true;
        },
        async generateDomains() {
            const domains = [];
            for (const prefix of itens.filter(item => item.type === 'prefix')) {
                for (const sufix of itens.filter(item => item.type === 'sufix')) {
                    const name = prefix.description + sufix.description;
                    const available = await isDomainAvailable(`${name.toLowerCase()}.com.br`);
                    const url = `https://checkout.hostgator.com.br/?a=add&sld=${name.toLowerCase()}&tld=.com.br`;
                    domains.push({
                        name,
                        url,
                        available
                    });
                }
            }
            return domains;
        },
        async generateDomain(_, args) {
            const name = args.name;
            const domains = [];
            const extensions = ['.com.br', '.com', '.net', '.org'];
            for (const extension of extensions) {
                const available = await isDomainAvailable(`${name.toLowerCase()}${extension}`);
                const url = `https://checkout.hostgator.com.br/?a=add&sld=${name.toLowerCase()}&tld=${extension}`;
                domains.push({
                    name,
                    url,
                    available,
                    extension
                });
            }
            return domains;
        }
    }

};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();