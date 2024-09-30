import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentItem.module.scss';
import {
  PARTICIPANT_ID, TOURNAMENT_ID, USER_ID,
} from '../../../lib/constants/queries';

export interface Props<TData = any> {
  tournament: TData;
  userSlug?: string;
}

const TournamentItem: FC<Props> = ({
  tournament,
  userSlug,
}) => {
  const { id: tournamentId, name, venueAddress } = tournament;

  const tournamentInformationPath = useMemo(() => {
    const searchParams = new URLSearchParams([[TOURNAMENT_ID, tournamentId], [PARTICIPANT_ID, tournament?.participants?.nodes?.[0]?.id], [USER_ID, userSlug || '']]);
    return `/tournament?${searchParams.toString()}`;
  }, [tournament?.id, userSlug]);

  const tournamentImage = useMemo(() => {
    const tournamentImages = tournament?.images;
    if (tournamentImages) {
      const tournamentProfileImage = tournamentImages.find((image: any) => image.type === 'profile');
      return tournamentProfileImage?.url || '';
    }
    return '';
  }, [tournament?.participants?.nodes?.[0]?.id]);

  if (
    !tournamentId || !tournament?.participants?.nodes?.[0]?.id
  ) {
    return null;
  }

  return (
    <div className={styles.TournamentItem}>
      <Link className={styles.inner} to={tournamentInformationPath}>
        <div className={styles.defaultInformation}>
          <div className={styles.container}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={tournamentImage}
                aria-label="Tournament Image"
                loading="lazy"
              />
            </div>
            <div>
              <p className={styles.tournamentName}>{name}</p>
              <p className={styles.tournamentAddress}>{venueAddress}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

TournamentItem.displayName = 'TournamentItem';

export default TournamentItem;
