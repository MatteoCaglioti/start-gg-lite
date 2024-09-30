import { useQuery } from '@apollo/client';
import cx from 'classnames';
import React, { useMemo, useState } from 'react';
import useQueryParameters from '../../lib/util/useQueryParameters';
import styles from './TournamentPage.module.scss';
import GET_USER_TOURNAMENT_EVENTS from '../../lib/gql/GET_USER_TOURNAMENT_EVENTS';
import { PARTICIPANT_ID, USER_ID } from '../../lib/constants/queries';
import MatchDetails from './MatchDetails';
import EventDetails from './EventDetails';
import Loader from '../../components/base/Loader';

const StreamSource = {
  TWITCH: 'twitch.tv',
  HITBOX: 'smashcast.tv',
  STREAMME: 'stream.me',
  MIXER: 'mixer.com',
  YOUTUBE: 'youtube.com',
} as const;

type StreamKey = keyof typeof StreamSource;

const getFormattedDateNoTime = (date: Date, hasYear: boolean) => date.toLocaleString('default', {
  month: 'short',
  day: '2-digit',
  ...(hasYear && { year: 'numeric' }),
});

const TournamentPage = () => {
  const queryParameters = useQueryParameters();
  const [participantId] = useState<string>(
    queryParameters.get(PARTICIPANT_ID) || '',
  );
  const [userId] = useState<string>(queryParameters.get(USER_ID) || '');

  // add query to find next opponent (waiting for winner of set)
  const { data, loading, error } = useQuery(GET_USER_TOURNAMENT_EVENTS, {
    variables: { id: participantId, userId },
    fetchPolicy: 'network-only', // change to cache-first for testing
    skip: !participantId,
  });

  const mapsUrl = useMemo(
    () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      data?.participant?.events?.[0]?.tournament?.venueAddress || '',
    )}&query_place_id=${
      data?.participant?.events[0]?.tournament?.mapsPlaceId || ''
    }`,
    [data?.participant?.events?.[0]?.tournament?.venueAddress, loading],
  );

  if (error) {
    return null;
  }

  const tourneyStreams = data?.participant?.events?.[0]?.tournament?.streams;
  const tournamentStartTime = data?.participant?.events?.[0]?.tournament?.startAt;
  const tournamentEndTime = data?.participant?.events?.[0]?.tournament?.endAt;
  const tournamentURL = data?.participant?.events?.[0]?.tournament?.url;

  return (
    <div className={cx(styles.TournamentPage)}>
      <Loader isLoading={loading} />
      {!loading && (
        <>
          <a className={cx(styles.title)} href={tournamentURL}>
            {data?.participant?.events?.[0]?.tournament?.name}
          </a>
          <div>
            <a href={mapsUrl} className={cx(styles.address)}>
              {data?.participant?.events?.[0]?.tournament?.venueAddress}
            </a>
            {tournamentStartTime && tournamentEndTime && (
              <p className={cx(styles.primaryContact)}>
                {`${getFormattedDateNoTime(
                  new Date(tournamentStartTime * 1000),
                  false,
                )} - ${getFormattedDateNoTime(
                  new Date(tournamentEndTime * 1000),
                  true,
                )}`}
              </p>
            )}
            <p className={cx(styles.primaryContact)}>
              {`Primary Contact: ${data?.participant?.events?.[0]?.tournament?.primaryContact}`}
            </p>
          </div>
          {tourneyStreams
            && tourneyStreams !== null
            && tourneyStreams.length > 0 && (
              <div className={cx(styles.streams)}>
                {tourneyStreams.map((stream: any) => {
                  const streamUrl = `https://www.${
                    StreamSource[stream.streamSource as StreamKey]
                  }/${stream.streamName}`;
                  return (
                    <a href={streamUrl} key={stream.streamName}>
                      {streamUrl}
                    </a>
                  );
                })}
              </div>
          )}
          {data?.participant?.events.map((event: any) => (
            <div className={cx(styles.details)} key={event?.name}>
              <EventDetails
                event={event}
                mainParticipantId={data.participant.id}
              />
              <MatchDetails
                event={event}
                entrantIds={data?.participant?.entrants.map(
                  (entrant: any) => entrant.id,
                )}
              />
              {loading ? 'loading...' : ''}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

TournamentPage.displayName = 'TournamentPage';

export default TournamentPage;
