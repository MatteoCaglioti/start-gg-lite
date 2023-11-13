import { gql } from '@apollo/client';

const GET_TOURNAMENT_IMAGE = gql`
  query getTournamentInfo($id: ID!) {
    tournament(id: $id){
      id
      images {
        type
        url
      }
    }
  }
`;

export default GET_TOURNAMENT_IMAGE;
