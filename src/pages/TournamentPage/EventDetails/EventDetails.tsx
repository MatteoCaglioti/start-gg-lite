/* eslint-disable react/jsx-one-expression-per-line */
import cx from 'classnames';
import React, { FC } from 'react';
import styles from './EventDetails.module.scss';

export interface Props<TData = any> {
  event: TData
}

const addOrdinalSuffix = (placing?: number) => {
  if (!placing) {
    return 'No Placing';
  }
  // eslint-disable-next-line no-mixed-operators
  return `${placing}${['st', 'nd', 'rd'][((placing + 90) % 100 - 10) % 10 - 1] || 'th'}`;
};

const EventDetails: FC<Props> = ({ event }) => (
  <div>
    <p className={cx(styles.title)}>{event?.name}</p>
    <div className={cx(styles.details)}>
      <p className={cx(styles.detail)}>Entrants: {event?.numEntrants}</p>
      <p className={cx(styles.detail)}>
        Placing: {addOrdinalSuffix(event?.userEntrant?.standing?.placement)}
      </p>
    </div>
  </div>
);

EventDetails.displayName = 'EventDetails';

export default EventDetails;
