import React, { FC } from 'react';
import logo from '../img/logo.png';
import magicEden from '../img/magic-eden.webp';

export const Footer: FC = () => {
  const markets = [
    {
      link: 'https://magiceden.io/marketplace/scoogis',
      src: magicEden
    },
    {
      link: 'https://solsea.io/collection/619306c9017f0640f1bb8718',
      src: 'https://solsea.io/assets/SolSea_Logo%20light.svg'
    }
  ];

  const social = [
    {
      link: 'https://twitter.com/ScoogisNFT',
      icon: 'fab fa-twitter',
      text: 'Twitter',
      color: '#fff'
    },
    {
      link: 'https://discord.gg/coogis',
      icon: 'fab fa-discord',
      text: 'Scoogi Discord',
      color: '#fff'
    },
    {
      link: 'https://discord.gg/m9MZVfxG',
      icon: 'fas fa-frog',
      text: 'ScoogiDAO Discord',
      color: '#fff'
    }
  ];

  const info = [
    {
      link: 'https://raritysniper.com/scoogis',
      src: 'https://raritysniper.com/favicon.png',
      text: 'Rarity Sniper'
    },
    {
      link: 'https://moonrank.app/collection/scoogis',
      text: '⍜ MoonRank'
    }
  ];

  return (
    <footer style={{ minHeight: '300px' }} className="text-white bg-green-700">
      <div className="container px-5 py-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-3">
            <a href="/">
              <img className="inline-block" src={logo} alt="Scoogis NFT" />
            </a>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-3">
            <h2 className="text-3xl text-white tracking-widest mb-3">
              MARKETS
            </h2>
            <nav className="list-none flex-col">
              {markets.map((market) => (
                <li className="mb-3" key={market.link}>
                  <a
                    className="text-2xl text-green-500 hover:text-white"
                    href={market.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{ height: '1.5rem' }}
                      className="inline-block mr-3 mb-1"
                      src={market.src}
                      alt={market.link}
                    />
                  </a>
                </li>
              ))}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-3">
            <h2 className="text-3xl text-white tracking-widest mb-3">SOCIAL</h2>
            <nav className="list-none">
              {social.map((s) => (
                <li className="mb-3" key={s.link}>
                  <a
                    className="text-2xl text-green-500 hover:text-white"
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i
                      style={{ color: s.color }}
                      className={`mr-3 ${s.icon}`}
                    />
                    <span>{s.text}</span>
                  </a>
                </li>
              ))}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-3">
            <h2 className="text-3xl text-white tracking-widest mb-3">
              USEFUL STUFF
            </h2>
            <nav className="list-none">
              {info.map((s) => (
                <li className="mb-3" key={s.link}>
                  <a
                    className="text-2xl text-green-500 hover:text-white"
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.src && (
                      <img
                        style={{ height: '1.5rem' }}
                        className="inline-block mr-3 mb-1"
                        src={s.src}
                        alt={s.link}
                      />
                    )}
                    <span>{s.text}</span>
                  </a>
                </li>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
