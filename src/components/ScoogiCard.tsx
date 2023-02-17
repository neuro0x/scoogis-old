import React, { FC } from 'react';
import { Card } from '@material-ui/core';
import { IScoogiCardProps } from '../utils/types';

export const ScoogiCard: FC<IScoogiCardProps> = ({
  currentScoogi,
  setSelectedScoogi,
  selectedScoogi,
  rarities
}) => {
  return (
    <div key={currentScoogi.mint}>
      <Card
        onClick={() => setSelectedScoogi(currentScoogi)}
        className={`${
          currentScoogi.mint === selectedScoogi?.mint
            ? 'border-green-500 rounded border-4'
            : ''
        } cursor-pointer`}
      >
        <img
          style={{ maxWidth: '100%' }}
          src={currentScoogi.metadata.image}
          alt={currentScoogi.metadata.name}
        />
        <h4
          style={{ textAlign: 'center' }}
          className="text-2xl font-bold text-white sm:text-3xl sm:tracking-tight lg:text-4xl my-1"
        >
          #{currentScoogi.metadata.name.split('#')[1]}
        </h4>
        <hr />
        <ul className="mx-3 my-2">
          {currentScoogi.metadata.attributes.map((t: any, i: number) => (
            <li key={i}>
              {t.trait_type}:{' '}
              <span className="bg-blue-500 rounded-full px-3 text-center ml-3">
                {t.value} (
                {((rarities[t.trait_type][t.value] / 6969) * 100).toFixed(2)}
                %)
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
