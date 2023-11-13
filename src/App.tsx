/* eslint-disable no-console */
import React, {
  FC, useEffect, useState,
} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import {
  ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import styles from './App.module.scss';
import Header from './components/compound/Header';
import HomePage from './pages/HomePage';
import Footer from './components/compound/Footer';
import UserData from './pages/UserTournaments';
import TournamentPage from './pages/TournamentPage';
import { PERSIST_LAST_PURGE_KEY } from './lib/constants/localstorage';

const ErrorBoundary = () => {
  // eslint-disable-next-line no-console
  console.error(useRouteError());
  return (
    <h2>
      An error has occured, if you see this
      message, please take a picture of the
      developer console with the error and email me it at:
      <a
        href="mailto:m.caglioti@hotmail.com?subject=StartGG%20Lite%20Error"
      >
          &nbsp;m.caglioti@hotmail.com
      </a>
      .
    </h2>
  );
};

export interface WrapperProps {
  children?: React.ReactNode;
}

const AppWrapper: FC<WrapperProps> = ({ children }) => (
  <>
    <Header className={styles.app_header} />
    <main className={styles.app__main}>
      {children}
    </main>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper><HomePage /></AppWrapper>,
    errorElement: <AppWrapper><HomePage /></AppWrapper>,
  },
  {
    path: 'user',
    element: <AppWrapper><UserData /></AppWrapper>,
    errorElement: <AppWrapper><ErrorBoundary /></AppWrapper>,
  },
  {
    path: 'tournament',
    element: <AppWrapper><TournamentPage /></AppWrapper>,
    errorElement: <AppWrapper><ErrorBoundary /></AppWrapper>,
  },
]);

const httpLink = createHttpLink({
  uri: 'https://api.start.gg/gql/alpha',
});

const apiKeyArray = [
  process.env.REACT_APP_API_KEY,
  process.env.REACT_APP_API_KEY_2,
];

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${apiKeyArray[(Math.random() > 0.5) ? 1 : 0]}`,
  },
}));

const defaultClient = new ApolloClient({
  link: (authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(defaultClient);
  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();
      const newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      });
      const lastPurge = localStorage.getItem(PERSIST_LAST_PURGE_KEY);
      if (!lastPurge || Number(lastPurge) < Date.now() - 1000 * 60 * 30) {
        localStorage.setItem(PERSIST_LAST_PURGE_KEY, String(Date.now()));
        await newPersistor.purge().catch((err) => console.log(`Cache purge error: ${err}`));
      } else {
        await newPersistor.restore().catch((err) => console.log(`Cache restore error: ${err}`));
      }
      setClient(
        new ApolloClient({
          uri: 'https://api.start.gg/gql/alpha',
          link: (authLink).concat(httpLink),
          cache,
        }),
      );
    }

    init().catch(console.error);
  }, []);

  return (
    <div className={styles.app}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  );
};

export default App;
