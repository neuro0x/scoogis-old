import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import yankoor from '../img/yankoor.png';
import scoogiCoin from '../img/ScoogiCoin.png';

export const Roadmap: FC = () => {
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
          Roadmap
        </h2>
        <hr className="mb-3" />

        <div className="flex-col text-center">
          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <img
                style={{ width: '2rem', height: '2rem' }}
                className="inline-block"
                src="logo192.png"
                alt="scoogi"
              />{' '}
              - Scoogi Mint begins - (10/29/2021) ✅
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <span className="text-3xl">🐶</span> - Doogi airdrop to early
              Scoogi minters - (11/18/2021) ✅
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <img
                style={{ width: '2rem', height: '2rem' }}
                className="inline-block"
                src={yankoor}
                alt="yeth"
              />{' '}
              - $COOGI{' '}
              <a
                href="https://discord.gg/coogis"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Casino Royale
              </a>{' '}
              - (12/1/2021) ✅
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <span className="text-3xl">🎲</span> - $COOGI{' '}
              <a
                href="https://discord.gg/coogis"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Bonus Games
              </a>{' '}
              - (12/1/2021) ✅
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <div className="text-2xl">
              <span className="text-3xl">⚔️</span> - Scoogi breeding rights{' '}
              <Link
                to="/battle"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Battle Game
              </Link>{' '}
              - (12/15/2021) ✅
            </div>
            <div className="text-xl">
              &nbsp;&nbsp;&nbsp;- Follow{' '}
              <a
                href="https://twitter.com/ScoogisBattle"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                @ScoogisBattle
              </a>{' '}
              to participate!
            </div>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <div className="text-2xl">
              <span className="text-3xl">🥖</span> - Scoogi breading (Breeding?)
              rights{' '}
              <Link
                to="/leaderboard"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Leaderboard
              </Link>{' '}
              - (Work in Progress)
            </div>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <span className="text-3xl">👑</span> -{' '}
              <a
                href="https://discord.gg/m9MZVfxG"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Scoogi DAO
              </a>{' '}
              (Work in progress)
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <span className="text-3xl">🕹️</span> - $COOGI{' '}
              <a
                href="https://discord.gg/coogis"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Arcade
              </a>{' '}
              - (TBD)
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <img
                className="inline-block"
                src="https://cdn.discordapp.com/emojis/899404028277039115.gif?size=32"
                alt="yeth"
              />{' '}
              - Scoogi gen1 breading (FFS... we're really doing breading aren't
              we?) - (TBD)
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              <img
                style={{ width: '2rem', height: '2rem' }}
                className="inline-block"
                src={scoogiCoin}
                alt="yeth"
              />{' '}
              - Physical Silver Coins sent to holders of Scoogis with Silver
              Coins - (TBD)
            </span>
          </div>

          <div
            style={{
              padding: '0.5rem 1rem',
              maxWidth: '100%',
              marginBottom: '.5rem'
            }}
          >
            <span className="text-2xl">
              AND MORE! Follow us on{' '}
              <a
                href="https://twitter.com/ScoogisNFT"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Twitter
              </a>{' '}
              and come discuss what's next on{' '}
              <a
                href="https://discord.gg/coogis"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-white text-3xl underline"
              >
                Discord
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
