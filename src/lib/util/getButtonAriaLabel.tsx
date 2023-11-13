/**
 * Gets the value for the aria-label of a button.
 * This is needed for screen readers since the buttons have a `text-transform: uppercase`.
 * @param children
 * @param altText
 * @returns
 */
const getButtonAriaLabel = (children: any, altText?: string): string | undefined => {
  if (altText) {
    return altText;
  }

  if (typeof children === 'string') {
    return children;
  }

  return undefined;
};

export default getButtonAriaLabel;
