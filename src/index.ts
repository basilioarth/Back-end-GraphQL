import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Query {
        helloWorld: String
    }
`;

const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello World!';
        },
    },
};

async function bootstrap() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 4000
        }
    });

    console.log(`Servidor iniciado em ${url}`);
}

bootstrap();