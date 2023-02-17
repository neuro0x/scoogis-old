import React, { FC, useEffect, useState } from 'react';
import { getBattleDetail } from '../api/matches.api';
import { getBattleRecord } from '../api/leaderboard.api';
import { RouteComponentProps } from 'react-router';
import YouTube from '@u-wave/react-youtube';
import { IBattleEntry, IBattleRecordDisplay } from '../utils/types';
import { withRouter } from 'react-router-dom';
import winnerImg from '../img/battle-results/winner.png';
import scoogiMissing from '../img/battle-results/scoogi-shadow.jpg';

interface IBattleDetails extends RouteComponentProps<{ id: string }> {}

const BattleDetails: FC<IBattleDetails> = (props) => {
  const [battleInitiated, setBattleInitiated] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [challengedUri, setChallengedUri] = useState('');
  const [aggressorUri, setAggressorUri] = useState('');
  const [aggressorMint, setAggressorMint] = useState('');
  const [aggressorHandle, setAggressorHandle] = useState('');
  const [challengedHandle, setChallengedHandle] = useState('');
  const [aggressorRecord, setAggressorRecord] = useState(
    {} as IBattleRecordDisplay
  );
  const [challengedRecord, setChallengedRecord] = useState(
    {} as IBattleRecordDisplay
  );
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');
  const [, setChallengedMint] = useState('');
  const [, setBattleEntry] = useState(null as IBattleEntry | null);

  useEffect(() => {
    const getEntry = async () => {
      const entry = await getBattleDetail(props.match.params.id);
      const {
        aggressorScoogiUri,
        aggressorScoogiMint,
        aggressorHandle,
        challengedScoogiUri,
        challengedScoogiMint,
        challengedHandle,
        winner,
        loser
      } = entry;

      const aggressorRecord = await getBattleRecord(aggressorHandle);
      const challengedRecord = await getBattleRecord(challengedHandle);
      setAggressorRecord(aggressorRecord);
      setChallengedRecord(challengedRecord);

      setBattleEntry(entry);
      setAggressorUri(aggressorScoogiUri);
      setAggressorMint(aggressorScoogiMint);
      setAggressorHandle(aggressorHandle);
      setChallengedUri(challengedScoogiUri);
      setChallengedMint(challengedScoogiMint);
      setChallengedHandle(challengedHandle);
      setBattleInitiated(true);
      setBattleCompleted(!!winner);
      setWinner(winner);
      setLoser(loser);
    };
    getEntry();
  }, []);

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
            ⚔️ Battle Results ⚔️
          </h2>
          <hr className="mb-3" />

          <div className={`w-full p-5`}>
            {!videoEnded && (
              <YouTube
                width="100%"
                height="500px"
                video={'zKYujZz8gXU'}
                autoplay
                onEnd={() => setVideoEnded(true)}
                onPause={() => setVideoEnded(true)}
              />
            )}
          </div>

          {videoEnded && battleInitiated && !battleCompleted && (
            <div>
              <h2 className={`text-3xl text-center`}>
                We're waiting on your opponent, they're scared. Probably...
              </h2>
              <h2 className={`text-3xl text-center mb-5`}>
                Go over to{' '}
                <a
                  href="/battle"
                  rel="no-referrer"
                  target="_blank"
                  className="text-green-500 hover:text-white text-3xl underline"
                >
                  Twitter
                </a>{' '}
                and tell them to c'mon already!
              </h2>

              {aggressorUri && (
                <div className="flex justify-around text-3xl mb-2">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="cursor-pointer text-white hover:text-green-500 text-3xl underline"
                    href={`https://twitter.com/${aggressorHandle}`}
                  >
                    {aggressorHandle} {aggressorRecord.record}
                  </a>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="cursor-pointer text-white hover:text-green-500 text-3xl underline"
                    href={`https://twitter.com/${challengedHandle}`}
                  >
                    {challengedHandle} {challengedRecord.record}
                  </a>
                </div>
              )}

              {challengedUri && (
                <div className="flex justify-around text-3xl mb-2">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="cursor-pointer text-white hover:text-green-500 text-3xl underline"
                    href={`https://twitter.com/${challengedHandle}`}
                  >
                    {challengedHandle}
                  </a>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="cursor-pointer text-white hover:text-green-500 text-3xl underline"
                    href={`https://twitter.com/${aggressorHandle}`}
                  >
                    {aggressorHandle} {aggressorRecord.record}
                  </a>
                </div>
              )}

              <div className={`versus-frame`}>
                <div id="versus-frame" />
                <img
                  className={`rounded`}
                  src={aggressorUri ? aggressorUri : challengedUri}
                  alt="Scoogi ready to fight"
                />
                <img
                  className={`rounded flipped`}
                  src={scoogiMissing}
                  alt="Missing Opponent"
                />
              </div>
              <h2 className={`text-3xl text-center mb-5`}>
                Keep an eye out for the results on{' '}
                <a
                  href="/battle"
                  rel="no-referrer"
                  target="_blank"
                  className="text-green-500 hover:text-white text-3xl underline"
                >
                  Twitter
                </a>
                !
              </h2>
            </div>
          )}

          {videoEnded && battleInitiated && battleCompleted && (
            <div>
              <h2 className={`text-3xl text-center`}>
                Umm, sers. We have a winner...
              </h2>
              <h2 className={`text-3xl text-center mb-3`}>
                Screenshot and share these results on{' '}
                <a
                  href="https://twitter.com/ScoogisNFT"
                  rel="noreferrer"
                  target="_blank"
                  className="text-green-500 hover:text-white text-3xl underline"
                >
                  Twitter
                </a>
                !
              </h2>

              <div className="flex justify-around text-3xl mb-2">
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cursor-pointer text-white hover:text-green-500 text-3xl underline"
                  href={`https://twitter.com/${
                    winner === aggressorMint
                      ? aggressorHandle
                      : challengedHandle
                  }`}
                >
                  {winner === aggressorMint
                    ? `${aggressorHandle}  ${aggressorRecord.record}`
                    : `${challengedHandle}  ${challengedRecord.record}`}
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cursor-pointer text-white hover:text-green-500 text-3xl underline"
                  href={`https://twitter.com/${
                    loser === aggressorMint ? aggressorHandle : challengedHandle
                  }`}
                >
                  {loser === aggressorMint
                    ? `${aggressorHandle}  ${aggressorRecord.record}`
                    : `${challengedHandle}  ${challengedRecord.record}`}
                </a>
              </div>

              <div className={`versus-frame`}>
                <div id="versus-frame" />
                <img
                  className="rounded"
                  src={winnerImg}
                  alt="winner"
                  id="winner"
                />
                <img
                  className={`rounded`}
                  src={winner === aggressorMint ? aggressorUri : challengedUri}
                  alt="Winner"
                />
                <img
                  className={`rounded flipped`}
                  src={loser === aggressorMint ? aggressorUri : challengedUri}
                  alt="Loser"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(BattleDetails);
