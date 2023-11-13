import { gql } from '@apollo/client';

const GET_USER_TOURNAMENTS = gql`
  query User($slug: String!, $perPage: Int!, $gamerTag: String!) {
    user(slug: $slug){
      id
      tournaments (
        query: { 
          perPage: $perPage
        filter: { 
          past:true,
          upcoming:true
        } 
      }) 
      {
        nodes {
          id
          name
          images {
            type
            url
          }
          venueAddress
          participants(query: {
            filter: {
            gamerTag: $gamerTag
            }
          }) {
            nodes {
              id
            }
          }
        }
      }
    }
  }
`;

export default GET_USER_TOURNAMENTS;
