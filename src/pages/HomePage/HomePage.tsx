import React from 'react';
import cx from 'classnames';
import styles from './HomePage.module.scss';
import SettingsPhoto from '../../assets/imgs/smashgg-profile-settings.png';
import SettingsProfileUrlPhoto from '../../assets/imgs/smashgg-profile-url.png';

const HomePage = () => (
  <div className={styles.HomePage}>
    <div className={styles.header}>
      <h1 className={styles.title}>Start.gg Lite</h1>
      <p className={styles.description}>
        A minimalistic version of the startgg website. Easily view tournament information,
        event information, and more!
      </p>
    </div>
    <div className={styles.content}>
      <div>
        <h2 className={styles.contentTitle}>How to get your User ID</h2>
      </div>
      <p className={styles.contentDescription}>
        Unforunately, the application does not currently support OAuth
        (logging in using start gg credentials),
        and may never will (for obvious reasons xD).
        <br />
        Head to Start.gg and go to your Profile Settings. From there you can grab the profile
        ID located within the site&apos;s URL.
      </p>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={SettingsPhoto} alt="Start GG User Side Panel" />
        </div>
        <div className={cx(styles.imageWrapper, styles.centeredImage)}>
          <img className={styles.image} src={SettingsProfileUrlPhoto} alt="Start GG User URL" />
        </div>
      </div>
    </div>
  </div>
);

HomePage.displayName = 'HomePage';

export default HomePage;
