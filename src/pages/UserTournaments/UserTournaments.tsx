import cx from 'classnames';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useQuery } from '@apollo/client';
import styles from './UserTournaments.module.scss';
import InputField from '../../components/base/InputField';
import Button from '../../components/base/Button';
import GET_USER_TOURNAMENTS from '../../lib/gql/GET_USER_TOURNAMENTS';
import TournamentList from './TournamentList';
import useQueryParameters from '../../lib/util/useQueryParameters';
import { USER_SLUG } from '../../lib/constants/queries';
import GET_USER_DATA from '../../lib/gql/GET_USER_DATA';

const UserTournaments = () => {
  const queryParameters = useQueryParameters();
  const inputRef = useRef<HTMLInputElement>(null);
  const [userSlug, setUserSlug] = useState<string>(queryParameters.get(USER_SLUG) || '');
  const {
    data: userData, loading: userDataLoading,
  } = useQuery(GET_USER_DATA, {
    variables: { slug: userSlug },
    fetchPolicy: 'cache-first',
    skip: (!userSlug),
  });

  const gamerTag = userData?.user?.player?.gamerTag;

  const {
    error, data, loading,
  } = useQuery(GET_USER_TOURNAMENTS, {
    variables: { slug: userSlug, perPage: 25, gamerTag },
    fetchPolicy: 'cache-first',
    skip: (userDataLoading || !userSlug || !gamerTag),
  });

  const tournaments = data?.user?.tournaments?.nodes;

  const hasError = (!!error)
    && !userSlug === true
    && !loading;

  useEffect(() => {
    if (userSlug) {
      const url = new URL(window.location.href);
      url.searchParams.set(USER_SLUG, userSlug);
      window.history.replaceState(null, '', url);
    }
  }, [userSlug]);

  const onClick = () => {
    if (inputRef.current) {
      setUserSlug(inputRef.current.value);
    }
  };

  const handleEnterKey = (event: any) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  const hasNoResults = !loading && !userDataLoading
    && tournaments !== undefined
    && tournaments?.length === 0;

  return (
    <div className={cx(styles.UserTournaments)}>
      <h2 className={styles.title}>Enter your start.gg User ID</h2>
      <div className={styles.inputContainer}>
        <InputField
          ref={inputRef}
          defaultValue={userSlug}
          className={styles.input}
          label="User ID"
          name="gettournaments"
          hasError={hasError}
          helperText={hasError ? 'Unable to fetch User Details.' : ''}
          onKeyDown={handleEnterKey}
        />
        <Button className={styles.button} onClick={onClick}>Get Tournaments</Button>
      </div>
      <TournamentList
        tournaments={tournaments}
        userSlug={userData?.user?.id}
      />
      <div className={styles.noResults}>
        {hasNoResults ? 'No results found.' : ''}
        {loading ? 'loading...' : ''}
      </div>
    </div>
  );
};

UserTournaments.displayName = 'UserTournaments';

export default UserTournaments;
