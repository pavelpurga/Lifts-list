import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://snowtooth.moonhighway.com/',
    cache: new InMemoryCache(),
});

export const getClient = () => client;

   export const ALL_LIFTS_QUERY = gql`
        query AllLifts {
            allLifts {
                name
                elevationGain
                status
            }
        }
    `;

