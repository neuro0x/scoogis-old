import React, { FC } from 'react';
import { Card } from '@material-ui/core';
import styled from 'styled-components';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import rarities from '../utils/rarities';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { css } from '@emotion/react';
import { PuffLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ConnectButton = styled(WalletDialogButton)``;
const MintContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`; // add your styles here

interface MyScoogiProps {
  wallet?: AnchorWallet;
  scoogisLoading: boolean;
  width: number;
  myScoogis: any[];
  scoogisLoaded: boolean;
}

export const MyScoogis: FC<MyScoogiProps> = ({
  wallet,
  scoogisLoaded,
  width,
  myScoogis,
  scoogisLoading
}) => (
  <MintContainer
    style={{
      maxWidth: 1200,
      margin: '3rem auto',
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
    <div style={{ padding: '1rem 2rem 2rem' }}>
      <h2
        className="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-5"
        style={{ textAlign: 'center' }}
      >
        My Scoogis
      </h2>
      <hr className="mb-3" />
      {!wallet && (
        <ConnectButton
          style={{
            fontFamily: 'Patrick Hand SC',
            display: 'block',
            margin: '3rem',
            textAlign: 'center'
          }}
        >
          Connect Wallet
        </ConnectButton>
      )}

      <PuffLoader
        color={`#047857`}
        size={500}
        css={override}
        loading={scoogisLoading}
      />

      {wallet && scoogisLoaded && !myScoogis.length && (
        <div className="text-2xl text-center mx-auto mt-5 w-full">
          <h2> No Scoogis :(</h2>
          <div>
            Scroll to the bottom of the page to find a Scoogi on the open
            market!
          </div>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gap: 32,
          gridTemplateColumns: width > 768 ? 'repeat(3, 1fr)' : '1fr'
        }}
      >
        {myScoogis.map((s: any) => (
          <div key={s.mint}>
            <Card>
              <img
                style={{ maxWidth: '100%' }}
                src={s.metadata.image}
                alt={s.metadata.name}
              />
              <h4
                style={{ textAlign: 'center' }}
                className="text-2xl font-bold text-white sm:text-3xl sm:tracking-tight lg:text-4xl my-1"
              >
                #{s.metadata.name.split('#')[1]}
              </h4>
              <hr />
              <ul className="mx-3 my-2">
                {s.metadata.attributes.map((t: any, i: number) => (
                  <li key={i}>
                    {t.trait_type}:{' '}
                    <span className="bg-blue-500 rounded-full px-3 text-center ml-3">
                      {t.value} (
                      {((rarities[t.trait_type][t.value] / 6969) * 100).toFixed(
                        2
                      )}
                      %)
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </MintContainer>
);
