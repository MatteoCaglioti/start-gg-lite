import { gql } from '@apollo/client';

const GET_ENTRANT_SETS = gql`
  query EventSets($eventId: ID!, $entrantId: ID!, $page: Int!) {
    event(id: $eventId) {
      sets(
        page: $page
        perPage: 16
        filters: {
          entrantIds: [$entrantId]
        }
      ) {
        nodes {
          id
          fullRoundText
          slots {
            standing {
              placement
              stats {
                score {
                  value
                }
              }
            }
            entrant {
              id
              name
            }
          }
          phaseGroup {
            id
          }
        }
      }
    }
  }
`;

export default GET_ENTRANT_SETS;
