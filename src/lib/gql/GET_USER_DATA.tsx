import { gql } from '@apollo/client';

const GET_USER_DATA = gql`
  query User($slug: String!) {
    user(slug: $slug){
      id
      slug
      player{
        gamerTag
      }
    }
  }
`;

export default GET_USER_DATA;
