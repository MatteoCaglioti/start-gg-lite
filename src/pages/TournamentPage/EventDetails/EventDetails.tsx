/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import cx from 'classnames';
import styles from './EventDetails.module.scss';

export interface Props<TData = any> {
  event: TData;
  mainParticipantId: number;
}

const addOrdinalSuffix = (placing?: number) => {
  if (!placing) {
    return 'No Placing';
  }
  // eslint-disable-next-line no-mixed-operators
  return `${placing}${
    ['st', 'nd', 'rd'][((((placing + 90) % 100) - 10) % 10) - 1] || 'th'
  }`;
};

const EventDetails = ({ event, mainParticipantId }: Props) => {
  const placing = event?.userEntrant?.standing?.placement;
  const seed = event?.userEntrant?.seeds?.[1]?.seedNum
    || event?.userEntrant?.seeds?.[0]?.seedNum;
  const teammateName = event?.userEntrant?.participants
    ?.filter((participant: any) => participant.id !== mainParticipantId)
    ?.map((teammateData: any) => teammateData.gamerTag)
    .join('/') || '';

  return (
    <div>
      <p className={cx(styles.title)}>{event?.name}</p>
      <div className={cx(styles.details)}>
        {teammateName && teammateName.length && (
          <p className={cx(styles.detail)}>Teammate(s): {teammateName}</p>
        )}
        <p className={cx(styles.detail)}>Entrants: {event?.numEntrants}</p>
        {placing && (
          <p className={cx(styles.detail)}>
            Placing: {addOrdinalSuffix(event?.userEntrant?.standing?.placement)}
          </p>
        )}
        {seed && <p className={cx(styles.detail)}>Seed: {seed}</p>}
      </div>
    </div>
  );
};

EventDetails.displayName = 'EventDetails';

export default EventDetails;
