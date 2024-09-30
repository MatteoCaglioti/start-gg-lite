import cx from 'classnames';
import React, { FC, useMemo } from 'react';
import styles from './MatchDetails.module.scss';

const MATCH_STATE = ['', 'Not Started', 'In Progress', 'Completed'] as const;

export interface MatchDetailsProps<TData = any> {
  event: TData;
  entrantIds: string[];
}

export interface MatchProps<TData = any> {
  setDetails: TData;
  entrantIds: string[];
  timezone?: string;
  countryCode?: string;
}

const Match: FC<MatchProps> = ({
  setDetails,
  entrantIds,
  countryCode,
  timezone,
}) => {
  const setStartTime = setDetails?.phaseGroup?.startAt
    ? new Date(setDetails.phaseGroup.startAt * 1000)
    : null;

  const opponentSlot = setDetails.slots.find(
    (slot: any) => !entrantIds.includes(slot?.entrant?.id),
  );

  const opponentSeed = opponentSlot?.seed?.seedNum;

  const opponentIsWinner = opponentSlot?.entrant?.id === setDetails.winnerId;

  const setDisplayScore = useMemo(() => {
    if (setDetails?.displayScore) {
      const setValues = setDetails?.displayScore?.match(/\d/g);
      if (!setValues) {
        return 'DQ';
      }
      const minValue = Math.min(...setValues);
      const maxValue = Math.max(...setValues);
      return opponentIsWinner
        ? `${minValue} - ${maxValue}`
        : `${maxValue} - ${minValue}`;
    }
    return '';
  }, [opponentSlot?.entrant?.id, setDetails?.displayScore]);

  return (
    <div className={cx(styles.match)}>
      <div className={cx(styles.setDetails)}>
        <span className={cx(styles.round)}>
          {[
            setDetails?.phaseGroup?.phase?.name || '',
            `Pool ${setDetails?.phaseGroup?.displayIdentifier}`,
            setDetails?.fullRoundText || '',
            setDetails?.state || 0,
          ].map((setDetail, index, array) => {
            if (array.length - 1 === index) {
              let state = setDetail;
              /* For some reason there is a state that was greater than 6 idk why
              Documentation doesnt say anything about how state Ints map with states
              (assumed 1-3 are 'not started', 'in progress' and 'complete') */
              if (state > 3) {
                state = Math.floor(state / 2);
              }
              return (
                <p
                  key={setDetail}
                  className={cx(
                    styles[MATCH_STATE[state].toLowerCase().replace(' ', '_')],
                  )}
                >
                  {MATCH_STATE[state]}
                  {opponentSeed && (
                    <span className={cx(styles.seed)}>
                      &nbsp;(Seed&nbsp;
                      {opponentSeed}
                      )
                    </span>
                  )}
                </p>
              );
            }
            return (
              <React.Fragment key={setDetail}>
                <p className={cx(styles.setDetail)}>{setDetail}</p>
                <p className={cx(styles.dash)}>-</p>
              </React.Fragment>
            );
          })}
          {setStartTime && countryCode && timezone && (
            <>
              <p className={cx(styles.dash)}>-</p>
              <p className={cx(styles.phaseTime)}>
                <span>
                  {setStartTime.toLocaleString(countryCode, {
                    timeZone: timezone,
                  })}
                </span>
              </p>
            </>
          )}
        </span>
        <div className={cx(styles.opponent)}>
          <p className={cx(styles.versus)}>vs</p>
          <p className={cx(styles.opponentName)}>
            {opponentSlot?.entrant?.name || 'N/A'}
          </p>
          <p
            className={cx(styles.displayScore, styles.displayScore_mobile, {
              [styles.winner]: !opponentIsWinner,
              [styles.loser]: opponentIsWinner,
            })}
          >
            {setDisplayScore}
          </p>
        </div>
      </div>
      <div
        className={cx(styles.displayScore, styles.displayScore_desktop, {
          [styles.winner]: !opponentIsWinner,
          [styles.loser]: opponentIsWinner,
        })}
      >
        {setDisplayScore}
      </div>
    </div>
  );
};

const MatchDetails: FC<MatchDetailsProps> = ({ event, entrantIds }) => {
  if (event?.sets?.nodes.length === 0) {
    return <p className={styles.noResults}>No Sets Played</p>;
  }

  return (
    <div className={cx(styles.MatchDetails)}>
      <div className={cx(styles.header)}>
        <p>MatchDetails</p>
      </div>
      <div className={cx(styles.matches)}>
        {event?.sets?.nodes?.map((node: any) => (
          <Match
            key={node.id}
            setDetails={node}
            entrantIds={entrantIds}
            timezone={event?.tournament?.timezone}
            countryCode={event?.tournament?.countryCode}
          />
        ))}
      </div>
    </div>
  );
};

MatchDetails.displayName = 'MatchDetails';

export default MatchDetails;
