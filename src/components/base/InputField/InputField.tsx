import cx from 'classnames';
import React, {
  ButtonHTMLAttributes,
  forwardRef, HTMLInputTypeAttribute, useRef,
} from 'react';
import styles from './InputField.module.scss';

export interface Props extends ButtonHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputType?: HTMLInputTypeAttribute;
  disabled?: boolean;
  label?: string;
  hasError?: boolean;
  helperText?: string;
  name: string;
  onChange?(e?: any): void;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({
    className,
    inputType = 'text',
    disabled = false,
    label,
    helperText,
    name,
    onChange,
    hasError,
    ...props
  }, ref) => {
    const textboxId = useRef<string>(crypto.randomUUID());

    return (
      <div className={cx(className, styles.InputField)}>
        <input
          {...props}
          className={cx(styles.input, {
            [styles.inputError]: hasError,
          })}
          type={inputType}
          disabled={disabled}
          id={textboxId.current}
          name={name}
          onChange={onChange}
          placeholder="&nbsp;"
          ref={ref}
          autoComplete="true"
        />
        {label && (
          <label
            className={cx(styles.placeholder, {
              [styles.placeholderError]: hasError,
              [styles.disabled]: disabled,
            })}
            htmlFor={textboxId.current}
          >
            {label}
          </label>
        )}
        {helperText && (
          <div
            className={cx(styles.helperText, {
              [styles.helperTextError]: hasError,
            })}
          >
            {helperText}
          </div>
        )}

      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
