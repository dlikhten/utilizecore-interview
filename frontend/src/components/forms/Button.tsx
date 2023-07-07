import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface SharedButtonAttributes {
  children: any;
  className?: string;
  buttonStyle?: 'wide' | 'full' | 'standard';
}

export type ButtonAttributes = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  SharedButtonAttributes & {
    disabled?: boolean;
  };

export const Button = ({
  children,
  className,
  buttonStyle = 'standard',
  disabled = false,
  ...rest
}: ButtonAttributes) => {
  return (
    <button
      className={classNames(
        'block whitespace-nowrap',
        'rounded-md bg-blue-500 text-white p-4',
        {
          'w-full': buttonStyle === 'full',
          'w-32': buttonStyle === 'wide',
          'bg-indigo-300 hover:bg-indigo-300': disabled,
        },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <span className="flex-nowrap flex whitespace-nowrap justify-center">{children}</span>
    </button>
  );
};
