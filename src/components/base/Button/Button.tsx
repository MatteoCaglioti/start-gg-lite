import React, {
  FC, ReactNode, SVGProps,
} from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import getButtonAriaLabel from '../../../lib/util/getButtonAriaLabel';

export interface Props {
  altText?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  onClick?(e?: any): void;
}

const Button: FC<Props> = ({
  altText,
  children,
  className,
  disabled,
  icon: Icon = null,
  iconClassName,
  onClick,
}) => (
  <button
    aria-label={getButtonAriaLabel(children, altText)}
    className={cx(className, styles.button)}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {children}
    {Icon && (
      <Icon
        className={cx(
          iconClassName,
          styles.icon,
        )}
        aria-hidden="true"
      />
    )}
  </button>
);

Button.displayName = 'Button';

export default Button;
