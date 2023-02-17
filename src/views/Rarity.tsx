import React, { FC } from 'react';
import rarities from '../utils/rarities';

const viewRarities = Object.keys(rarities).reduce((acc, curr) => {
  acc[curr] = Object.keys(rarities[curr])
    .map((kk) => ({
      category: curr,
      trait: kk,
      value: rarities[curr][kk]
    }))
    .sort((a, b) => b.value - a.value);
  return acc;
}, {} as { [key: string]: any });

export const Rarity: FC = () => {
  return (
    <div
      style={{
        maxWidth: 'calc(100% - 4rem)',
        width: '1200px',
        margin: '3rem auto 0',
        padding: '0 2rem'
      }}
    >
      <div
        style={{
          marginBottom: '5rem',
          padding: '1rem 2rem 2rem',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#303030',
            opacity: 0.75,
            borderRadius: '2rem',
            boxShadow: '0px 5px 15px -2px rgba(0,0,0,0.33)',
            zIndex: -1
          }}
        />

        <h2
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            marginTop: '1rem',
            width: '100%',
            display: 'inline-flex',
            justifyContent: 'center'
          }}
          className="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
        >
          Rarities
        </h2>
        <hr className="mb-3" />
        {Object.keys(viewRarities).map((key: any) => {
          return (
            <div
              key={key}
              style={{
                padding: '0.5rem 1rem',
                maxWidth: '100%',
                marginBottom: '1rem'
              }}
            >
              <h2
                className="text-3xl font-extrabold text-white sm:text-4xl sm:tracking-tight lg:text-5xl"
                style={{ marginBottom: '1rem' }}
              >
                {' '}
                {key}:
              </h2>
              {viewRarities[key].map((occ: any) => {
                return (
                  <span
                    key={occ.trait}
                    className="bg-blue-500 rounded-full px-3 text-center ml-3 inline-block mb-2"
                  >
                    {`${occ.trait}: ${occ.value} (${(
                      (occ.value / 6969) *
                      100
                    ).toFixed(2)}%)`}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
