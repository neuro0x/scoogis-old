import React, { FC } from 'react';

export const GamePlayItem: FC<{ content: string; header?: boolean }> = ({
  content,
  header
}) => (
  <li
    style={{
      padding: '0.5rem 1rem',
      maxWidth: '100%',
      marginBottom: '.25rem'
    }}
  >
    <span className={header ? 'text-3xl' : 'text-2xl'}>
      {content}
      {header && <hr className="max-w-sm mx-auto" />}
    </span>
  </li>
);
