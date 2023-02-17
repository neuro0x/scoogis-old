import React, { FC, useEffect, useState } from 'react';
import { IBattleRecord, IScoogi, Paginated } from '../utils/types';
import {
  getTwitterLeaderList,
  getWinnerScoogis,
  getLoserScoogis,
  getVirginScoogis
} from '../api/leaderboard.api';
import { LeaderboardSelect } from '../components/LeaderboardSelect';
import { Button, TextField } from '@material-ui/core';

// TODO: fix pagination bug
export const Leaderboard: FC = () => {
  const [name, setName] = useState('');
  const [board, setBoard] = useState('scoogi');
  const [winnerList, setWinnerList] = useState({} as Paginated<IScoogi>);
  const [loserList, setLoserList] = useState({} as Paginated<IScoogi>);
  const [virginList, setVirginList] = useState({} as Paginated<IScoogi>);
  const [twitterLeaderList, setTwitterLeaderList] = useState(
    {} as Paginated<IBattleRecord>
  );

  const handleOnSearch = () => {
    if (board === 'scoogi') {
      getScoogisLeaderboard();
    }

    if (board === 'twitter') {
      getTwitterLeaderboard();
    }
  };

  const getNextWinners = async () => {
    if (winnerList.hasNextPage) {
      const winnerScoogis = await getWinnerScoogis(name, winnerList.page + 1);
      setWinnerList(winnerScoogis);
    }
  };

  const getPrevWinners = async () => {
    if (winnerList.hasPrevPage) {
      const winnerScoogis = await getWinnerScoogis(name, winnerList.page - 1);
      setWinnerList(winnerScoogis);
    }
  };

  const getNextVirgins = async () => {
    if (virginList.hasNextPage) {
      const virginScoogis = await getVirginScoogis(name, virginList.page + 1);
      setVirginList(virginScoogis);
    }
  };

  const getPrevVirgins = async () => {
    if (virginList.hasPrevPage) {
      const virginScoogis = await getVirginScoogis(name, virginList.page - 1);
      setVirginList(virginScoogis);
    }
  };

  const getNextLosers = async () => {
    if (loserList.hasNextPage) {
      const loserScoogis = await getLoserScoogis(name, loserList.page + 1);
      setLoserList(loserScoogis);
    }
  };

  const getPrevLosers = async () => {
    if (loserList.hasPrevPage) {
      const loserScoogis = await getLoserScoogis(name, loserList.page - 1);
      setLoserList(loserScoogis);
    }
  };

  const getNextLeaders = async () => {
    if (twitterLeaderList.hasNextPage) {
      const leaders = await getTwitterLeaderList(
        name,
        twitterLeaderList.page + 1
      );
      setTwitterLeaderList(leaders);
    }
  };

  const getPrevLeaders = async () => {
    if (twitterLeaderList.hasPrevPage) {
      const leaders = await getTwitterLeaderList(
        name,
        twitterLeaderList.page - 1
      );
      setTwitterLeaderList(leaders);
    }
  };

  const getTwitterLeaderboard = async () => {
    const response = await getTwitterLeaderList(name, 0);
    setTwitterLeaderList(response);
  };

  const getScoogisLeaderboard = () => {
    getWinnerScoogis(name, 0).then((winnerScoogis: Paginated<IScoogi>) => {
      setWinnerList(winnerScoogis);
    });
    getVirginScoogis(name, 0).then((virginScoogis: Paginated<IScoogi>) => {
      setVirginList(virginScoogis);
    });
    getLoserScoogis(name, 0).then((loserScoogis: Paginated<IScoogi>) => {
      setLoserList(loserScoogis);
    });
  };

  useEffect(() => {
    if (board === 'twitter') {
      getTwitterLeaderboard();
    }

    if (board === 'scoogi') {
      getScoogisLeaderboard();
    }
  }, [board]);

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
            🏁 Leaderboard 🏁
          </h2>
          <hr className="mb-3" />

          <LeaderboardSelect setBoard={setBoard} />

          <div className="flex items-center justify-center m-3">
            <label htmlFor="search" className="text-3xl mr-2">
              Search:
            </label>
            <TextField
              id="search"
              type="text"
              placeholder={board === 'scoogi' ? 'Scoogi #6969' : '0xNeuroD'}
              onChange={(event) => setName(event.target.value)}
            />
            <Button
              style={{ marginLeft: '1rem' }}
              variant="outlined"
              onClick={handleOnSearch}
            >
              Search
            </Button>
          </div>

          {board === 'twitter' && (
            <div className="flex justify-center">
              <div className="w-full">
                <h2 className={`text-center text-3xl`}>Twitter Leaders</h2>
                <hr />
                <div className="flex justify-around m-2">
                  <Button
                    disabled={!twitterLeaderList.hasPrevPage}
                    onClick={getPrevLeaders}
                    variant="outlined"
                  >
                    {' '}
                    {'< Prev Page'}{' '}
                  </Button>
                  <Button
                    disabled={!twitterLeaderList.hasNextPage}
                    onClick={getNextLeaders}
                    variant="outlined"
                  >
                    {' '}
                    {'Next Page >'}{' '}
                  </Button>
                </div>

                <table className="table-auto w-full text-center">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Handle</th>
                      <th>(W / L)</th>
                      <th>Battle Avg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {twitterLeaderList?.docs?.length &&
                      twitterLeaderList.docs.map(
                        (it: IBattleRecord, index: number) => (
                          <tr key={it.handle}>
                            <td className={`self-start`}>
                              {index + twitterLeaderList.offset + 1}.
                            </td>
                            <td>
                              <a
                                href={`https://twitter.com/${it.handle}`}
                                className="text-green-500 hover:text-white underline"
                              >
                                {it.handle}
                              </a>
                            </td>
                            <td>{`(${it.wins}, ${it.losses})`}</td>
                            <td>{`${(it.wins / (it.wins + it.losses)).toFixed(
                              3
                            )}`}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {board === 'scoogi' && (
            <div className="flex justify-around">
              <div>
                <h2 className={`text-center text-3xl`}>Winners</h2>
                <hr />

                <div className="flex justify-around m-2">
                  <Button
                    disabled={!winnerList.hasPrevPage}
                    onClick={getPrevWinners}
                    variant="outlined"
                  >
                    {' '}
                    {'< Prev Page'}{' '}
                  </Button>
                  <Button
                    disabled={!winnerList.hasNextPage}
                    onClick={getNextWinners}
                    variant="outlined"
                  >
                    {' '}
                    {'Next Page >'}{' '}
                  </Button>
                </div>

                <ul>
                  {winnerList?.docs?.length &&
                    winnerList.docs.map((it: IScoogi) => (
                      <li
                        key={it.mint}
                        className={`flex justify-center items-center m-2`}
                      >
                        <img
                          className={`scoogitar`}
                          src={it.metadata.image}
                          alt={it.metadata.name}
                        />
                        <span className={`text-2xl mr-1`}>
                          {it.metadata.name}
                        </span>

                        <span className={`text-2xl`}>{`(${it.wins || 0}, ${
                          it.losses || 0
                        })`}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className={`text-center text-3xl`}>Battle Virgins</h2>
                <hr />

                <div className="flex justify-around m-2">
                  <Button
                    disabled={!virginList.hasPrevPage}
                    onClick={getPrevVirgins}
                    variant="outlined"
                  >
                    {' '}
                    {'< Prev Page'}{' '}
                  </Button>
                  <Button
                    disabled={!virginList.hasNextPage}
                    onClick={getNextVirgins}
                    variant="outlined"
                  >
                    {' '}
                    {'Next Page >'}{' '}
                  </Button>
                </div>

                <ul>
                  {virginList?.docs?.length &&
                    virginList.docs.map((it: IScoogi) => (
                      <li
                        key={it.mint}
                        className={`flex justify-center items-center m-2`}
                      >
                        <img
                          className={`scoogitar`}
                          src={it.metadata.image}
                          alt={it.metadata.name}
                        />
                        <span className={`text-2xl mr-1`}>
                          {it.metadata.name}
                        </span>

                        <span className={`text-2xl`}>{`(0, 0)`}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className={`text-center text-3xl`}>Losers</h2>
                <hr />

                <div className="flex justify-around m-2">
                  <Button
                    disabled={!loserList.hasPrevPage}
                    onClick={getPrevLosers}
                    variant="outlined"
                  >
                    {' '}
                    {'< Prev Page'}{' '}
                  </Button>
                  <Button
                    disabled={!loserList.hasNextPage}
                    onClick={getNextLosers}
                    variant="outlined"
                  >
                    {' '}
                    {'Next Page >'}{' '}
                  </Button>
                </div>

                {loserList?.docs?.length &&
                  loserList.docs.map((it: IScoogi) => (
                    <li
                      key={it.mint}
                      className={`flex justify-center items-center m-2`}
                    >
                      <img
                        className={`scoogitar`}
                        src={it.metadata.image}
                        alt={it.metadata.name}
                      />
                      <span className={`text-2xl mr-1`}>
                        {it.metadata.name}
                      </span>

                      <span className={`text-2xl`}>{`(${it.wins || 0}, ${
                        it.losses || 0
                      })`}</span>
                    </li>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
