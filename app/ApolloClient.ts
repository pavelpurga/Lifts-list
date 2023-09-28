import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://snowtooth.moonhighway.com/', // URL вашего GraphQL ендпоинта
    cache: new InMemoryCache(),
});

export default client;