import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './Button.css';

/**
 * Figma source: "buttons" component set, node 2081:1492
 * (https://www.figma.com/design/4m8yv2o7usGlI32Y1hmxSH/…?node-id=2081-1492)
 *
 * Figma variant dimensions -> this component's API:
 *  - type=Primary|Secondary   -> `variant`
 *  - size=Small|Medium|Large  -> `size`
 *  - icon=None|Left|Right     -> `icon` + `iconPosition`
 *  - icon=Alone               -> `icon` + `iconOnly`
 *  - state=Default             -> resting styles
 *  - state=Hover               -> native `:hover`
 *  - state=Focused              -> native `:focus-visible`
 *  - state=Selected             -> `selected` prop (renders as `aria-pressed`)
 *  - state=Disabled             -> native `disabled` attribute
 */

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual style. Maps to Figma `type`. @default 'primary' */
  variant?: ButtonVariant;
  /** Size. Maps to Figma `size`; also drives the size of `icon`. @default 'medium' */
  size?: ButtonSize;
  /** Icon to render alongside (or instead of) the label. Maps to Figma `icon`. */
  icon?: ReactNode;
  /** Where `icon` sits relative to the label. Ignored when `iconOnly` is set. @default 'right' */
  iconPosition?: ButtonIconPosition;
  /**
   * Renders only `icon`, no label — maps to Figma `icon=Alone`.
   * Requires `aria-label` (or `aria-labelledby`) since there is no visible text.
   */
  iconOnly?: boolean;
  /** Toggled/active state. Maps to Figma `state=Selected`; exposed as `aria-pressed`. @default false */
  selected?: boolean;
  /** Button label. Omitted from the DOM when `iconOnly` is set. */
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'right',
    iconOnly = false,
    selected = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    iconOnly ? 'ds-button--icon-only' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showLabel = !iconOnly && children != null;
  const showLeadingIcon = Boolean(icon) && !iconOnly && iconPosition === 'left';
  const showTrailingIcon = Boolean(icon) && (iconOnly || iconPosition === 'right');

  return (
    <button
      type={type}
      ref={ref}
      className={classes}
      aria-pressed={selected ? true : undefined}
      data-selected={selected ? '' : undefined}
      {...rest}
    >
      {showLeadingIcon && (
        <span className="ds-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {showLabel && <span className="ds-button__label">{children}</span>}
      {showTrailingIcon && (
        <span className="ds-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
});
