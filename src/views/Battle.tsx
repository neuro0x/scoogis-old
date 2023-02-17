import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BattleForm } from '../components/BattleForm';
import { GamePlayItem } from '../components/GamePlayItem';
import { AnchorWallet } from '@solana/wallet-adapter-react';

interface IBattleProps {
  wallet?: AnchorWallet;
  rpcHost: string;
  scoogisLoading: boolean;
  width: number;
  myScoogis: any[];
  scoogisLoaded: boolean;
}

export const Battle: FC<IBattleProps> = ({
  wallet,
  rpcHost,
  scoogisLoading,
  width,
  myScoogis,
  scoogisLoaded
}) => {
  const gameplayItems = [
    { content: 'Initiating a Scoogi Battle', header: true },
    { content: '@ScoogisBattle challenge @OtherScoogiOwner' },
    { content: '@ScoogisBattle will reply to your Tweet' },
    {
      content: 'All other trash talk allowed, but you MUST mention "challenge"'
    },
    {
      content: 'You can only participate in one battle at a time'
    },
    { content: 'Accepting/Denying a Scoogi Battle', header: true },
    { content: 'Reply to @ScoogisBattle Tweet with:' },
    { content: '@ScoogisBattle accept @OtherScoogiOwner' },
    { content: '@ScoogisBattle deny @OtherScoogiOwner' },
    {
      content:
        'All other trash talk allowed, but you MUST mention "accept" or "deny"'
    },

    { content: 'Confirming a Scoogi Battle', header: true },
    {
      content: '@ScoogisBattle will request a DM of your wallet address'
    },
    {
      content: 'This will allow you and opponent to enter battle as a pair'
    },
    { content: 'Battle for Breading Rights', header: true },
    { content: 'Scroll down and click on the button' },
    { content: 'Follow on screen instructions' },
    { content: 'Battle results will be shared on Twitter' }
  ];

  const outcomes = [
    {
      content:
        'The first season of Scoogi Battles will decide breading rights for next gen Scoogis',
      header: false
    },
    {
      content: 'Only half of Scoogis will produce a next gen Scoogi',
      header: false
    },
    {
      content:
        'All Scoogis are equal in battle and have a 50/50 chance of victory',
      header: false
    },
    {
      content: 'A Scoogi’s first battle will decide if they are breadable',
      header: false
    },
    {
      content:
        'Each subsequent battle will increase the chances of rarity in their offspring',
      header: false
    },
    {
      content: 'Battle status will be tracked on the Leaderboard',
      header: false
    },
    {
      content: 'Once a Scoogi has lost they can no longer battle',
      header: false
    },
    {
      content:
        'After Battle Season (TBD) a snapshot will be taken and next gen Scoogis sent',
      header: false
    }
  ];

  return (
    <>
      <div
        style={{
          maxWidth: 'calc(100% - 4rem)',
          width: '1200px',
          margin: '3rem auto 0',
          padding: '0 2rem'
        }}
      >
        <div style={{ marginBottom: '5rem', position: 'relative' }}>
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
            ⚔️ Breading Rights Battle 🥖
          </h2>
          <hr />

          <BattleForm
            wallet={wallet}
            scoogisLoading={scoogisLoading}
            scoogisLoaded={scoogisLoaded}
            myScoogis={myScoogis}
            width={width}
          />
        </div>

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
            ⚔️ Gameplay Instructions ⚔️
          </h2>
          <hr className="mb-3" />
          <ul className="flex-col text-center">
            {gameplayItems.map(({ content, header }) => (
              <GamePlayItem key={content} content={content} header={header} />
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: 'calc(100% - 4rem)',
          width: '1200px',
          margin: '0 auto 3rem auto',
          padding: '0 2rem 2rem'
        }}
      >
        <div
          style={{
            padding: '0 3rem 3rem',
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
            🥖 Outcomes 🥖
          </h2>
          <hr className="mb-3" />
          <ul className="flex-col text-center">
            {outcomes.map(({ content, header }) => (
              <GamePlayItem key={content} content={content} header={header} />
            ))}
          </ul>
          <div className="text-center text-2xl">
            Don't forget to check the{' '}
            <Link
              className="text-3xl text-green-500 hover:text-white"
              to="/Leaderboard"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
