import React from 'react';
import cx from 'classnames';
import styles from './Loader.module.scss';

const Loader = ({ isLoading }: { isLoading: boolean }) => (
  <svg
    className={cx(styles.loader, {
      [styles.isLoading]: isLoading,
    })}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
  >
    <radialGradient
      id="a11"
      cx=".66"
      fx=".66"
      cy=".3125"
      fy=".3125"
      gradientTransform="scale(1.5)"
    >
      <stop offset=".3" stopColor="#415a77ff" stopOpacity="0" />
      <stop offset=".6" stopColor="#415a77ff" stopOpacity=".3" />
      <stop offset=".8" stopColor="#415a77ff" stopOpacity=".6" />
      <stop offset="1" stopColor="#415a77ff" stopOpacity="1" />
      <stop offset="0" stopColor="#415a77ff" />
    </radialGradient>
    <circle
      style={{ transformOrigin: 'center' }}
      fill="none"
      stroke="url(#a11)"
      strokeWidth="15"
      strokeLinecap="round"
      strokeDasharray="200 1000"
      strokeDashoffset="0"
      cx="100"
      cy="100"
      r="70"
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="spline"
        dur="1"
        values="0;360"
        keyTimes="0;1"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      style={{ transformOrigin: 'center' }}
      fill="none"
      opacity=".2"
      stroke="#415a77ff"
      strokeWidth="15"
      strokeLinecap="round"
      cx="100"
      cy="100"
      r="70"
    />
  </svg>
);

Loader.displayName = 'Loader';

export default Loader;
