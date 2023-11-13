import { gql } from '@apollo/client';

const GET_USER_TOURNAMENT_SETS = gql`
query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
  event(id: $eventId) {
    id
    name
    sets(
      page: $page
      perPage: $perPage
      sortType: STANDARD
    ) {
      pageInfo {
        total
      }
      nodes {
        id
        slots {
          id
          entrant {
            id
            name
          }
        }
      }
    }
  }
},
`;

export default GET_USER_TOURNAMENT_SETS;
