import { gql } from '@apollo/client';

const GET_TOURNAMENT_INFORMATION = gql`
  query getTournamentInfo($id: ID!, $gamerTag: String!) {
    tournament(id: $id){
      id
      numAttendees
      startAt
      endAt
      rules
      state
      url(tab: "", relative: true)
      participants(query: {
        filter: {
        gamerTag: $gamerTag
        }
      }) {
        nodes {
          id
          gamerTag
        }
      }
    }
  }
`;

export default GET_TOURNAMENT_INFORMATION;
