import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://snowtooth.moonhighway.com/',
    cache: new InMemoryCache(),
});

export const getClient = () => client;

export const ALL_LIFTS_QUERY = gql`
  query AllLifts($status: LiftStatus) {
    allLifts(status: $status) {
      name
      elevationGain
      status
      trailAccess{
      name
      status
    }
    }
  }
`;

export const SET_LIFT_STATUS_MUTATION = gql`
  mutation setLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;
export enum LiftStatus {
    ALL = 'ALL',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    HOLD = 'HOLD',
}