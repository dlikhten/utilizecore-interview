import classNames from 'classnames';
import { ReactNode } from 'react';

export function TableCell({ children, span = 1 }: { children: ReactNode; span?: number }) {
  return (
    <div
      className={classNames('bg-white p-2 text-sm flex items-center')}
      style={{
        gridColumn: `span ${span} / span ${span}`,
      }}
    >
      {children}
    </div>
  );
}
