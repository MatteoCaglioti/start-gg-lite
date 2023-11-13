import React, { FC } from 'react';
import styles from './TournamentList.module.scss';
import TournamentItem from '../TournamentItem';

export interface Props<TData = any> {
  tournaments?: TData;
  userSlug?: string;
}

const TournamentList: FC<Props> = ({
  tournaments,
  userSlug,
}) => (
  <div className={styles.TournamentList}>
    {
      tournaments?.map((tournament: any) => (
        <TournamentItem key={tournament.id} tournament={tournament} userSlug={userSlug} />
      ))
    }
  </div>
);

TournamentList.displayName = 'TournamentList';

export default TournamentList;
