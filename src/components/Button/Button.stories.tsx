import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

import './Button.stories.css';

/** Minimal stand-in for the "arrow-up-right" icon used in the Figma source; swap for your icon set. */
function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Button — design system component (Figma node 2081:1492).
 *
 * `component: Button` + plain `args` (no custom `render`) means every story
 * below is a thin, real usage of the component: Storybook's autodocs and the
 * "Show code" panel display the actual JSX Button is rendered with, and the
 * Controls panel is generated straight from ButtonProps.
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Figma `type` — Primary or Secondary.',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Figma `size` — Small / Medium / Large.',
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Where `icon` renders relative to the label (ignored when `iconOnly`).',
    },
    selected: {
      control: 'boolean',
      description: 'Figma `state=Selected` — persistent pressed/active look (`aria-pressed`).',
    },
    disabled: {
      control: 'boolean',
      description: 'Figma `state=Disabled`.',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Renders only the icon; requires `aria-label` for accessibility.',
    },
    children: {
      control: 'text',
      description: 'Button label.',
    },
    // `icon` is a ReactNode, not a control-friendly primitive — `mapping`
    // lets the Controls panel drive it anyway via a plain radio: pick "None"
    // or "Icon" and Storybook substitutes the real value (undefined / JSX)
    // before rendering, so `iconPosition`/`iconOnly` have something to act on
    // in ANY story without every base story showing an icon by default.
    icon: {
      control: 'radio',
      options: ['none', 'icon'],
      mapping: {
        none: undefined,
        icon: <ArrowUpRightIcon />,
      },
      description: 'Toggle the demo icon on/off — combine with `iconPosition` / `iconOnly`.',
    },
    className: { control: false },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button',
    icon: undefined,
    iconPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Primary
// ============================================================================

export const PrimaryMedium: Story = {
  name: 'Primary / M',
  args: { variant: 'primary', size: 'medium' },
};

export const PrimarySmall: Story = {
  name: 'Primary / S',
  args: { variant: 'primary', size: 'small' },
};

export const PrimaryLarge: Story = {
  name: 'Primary / L',
  args: { variant: 'primary', size: 'large' },
};

// ============================================================================
// Secondary
// ============================================================================

export const SecondaryMedium: Story = {
  name: 'Secondary / M',
  args: { variant: 'secondary', size: 'medium' },
};

export const SecondarySmall: Story = {
  name: 'Secondary / S',
  args: { variant: 'secondary', size: 'small' },
};

export const SecondaryLarge: Story = {
  name: 'Secondary / L',
  args: { variant: 'secondary', size: 'large' },
};

// ============================================================================
// States
// Hover/Focused have no dedicated prop — they're native `:hover`/`:focus-visible`
// in real usage. Here they're previewed via a Storybook-only class from
// Button.stories.css that mirrors those pseudo-class rules exactly, passed
// through the real `className` prop. Selected/Disabled use the real props.
// ============================================================================

export const Hover: Story = {
  name: 'Hover',
  args: { variant: 'primary', size: 'medium', className: 'ds-button--force-hover' },
};

export const Focused: Story = {
  name: 'Focused',
  args: { variant: 'primary', size: 'medium', className: 'ds-button--force-focus' },
};

export const Selected: Story = {
  name: 'Selected / Clicked',
  args: { variant: 'primary', size: 'medium', selected: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { variant: 'primary', size: 'medium', disabled: true },
};

// ============================================================================
// Icons
// ============================================================================

export const WithIconLeft: Story = {
  name: 'Icon / Left',
  args: { variant: 'primary', size: 'medium', icon: <ArrowUpRightIcon />, iconPosition: 'left' },
};

export const WithIconRight: Story = {
  name: 'Icon / Right',
  args: { variant: 'primary', size: 'medium', icon: <ArrowUpRightIcon />, iconPosition: 'right' },
};

export const IconOnly: Story = {
  name: 'Icon / Only',
  args: {
    variant: 'primary',
    size: 'medium',
    icon: <ArrowUpRightIcon />,
    iconOnly: true,
    children: undefined,
    'aria-label': 'Open link',
  },
};
