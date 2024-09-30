import { gql } from '@apollo/client';

const GET_TOURNAMENT_INFORMATION = gql`
  query getParticipantEvents($id: ID!, $userId: ID!) {
    participant (id: $id){
      id
      entrants{
        id
      }
      events{
        id
        checkInBuffer
        name
        slug
        numEntrants
        tournament{
          name
          timezone
          countryCode
          venueAddress
          mapsPlaceId
          primaryContact
          url(tab: "", relative: false)
          startAt
          endAt
          streams {
            streamName
            streamSource
          }
        }
        userEntrant(userId: $userId) {
          id
          standing {
            id
            placement
          }
          seeds {
            id
            seedNum
            players {
              gamerTag
            }
          }
          participants {
            id
            gamerTag
          }
        }
        sets(
          page: 1,
          perPage: 100,
          sortType: MAGIC,
          filters: {
            participantIds: [$id]
          }
        ){
          pageInfo{
            total
          }
          nodes{
            id
            winnerId
            phaseGroup {
              id
              startAt
              displayIdentifier
              phase {
                id
                name
              }
            }
            slots(includeByes: true){
              id
              entrant{
                id
                name
              }
              seed {
                seedNum
              }
            }
            state
            fullRoundText
            displayScore(mainEntrantId: $id)
          }
        }
      }
    }
  }
`;

export default GET_TOURNAMENT_INFORMATION;
