const { ApolloServer } = require("apollo-server");
const dns = require('dns');
const service = require('./service');

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
        async itens(_, args) {
            const itens = await service.getItensByType(args.type);
            return itens;
        }
    },
    Mutation: {
        async saveItem(_, args) {
            const item = args.item;
            const [newItem] = await service.saveItem(item);
            return newItem;
        },
        async deleteItem(_, args) {
            const id = args.id;
            await service.deleteItem(id);
            return true;
        },
        async generateDomains() {
            const domains = [];
            const itens = await service.getItens();
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