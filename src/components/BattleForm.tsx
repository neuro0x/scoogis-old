import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import React, { FC, useEffect, useState } from 'react';
import rarities from '../utils/rarities';
import {
  IBattleEntry,
  IBattleFormProps,
  IScoogi,
  IWinnerLoser
} from '../utils/types';
import { doBattle, getFilters } from '../api/matches.api';
import { css } from '@emotion/react';
import { PuffLoader } from 'react-spinners';
import { ScoogiCard } from './ScoogiCard';
import { useHistory } from 'react-router';

const override = css`
  display: block;
  margin: 0 auto;
`;

const BattleForm: FC<IBattleFormProps> = ({
  wallet,
  width,
  scoogisLoading,
  scoogisLoaded,
  myScoogis
}) => {
  const [aggressor, setAggressor] = useState(false);
  const [error, setError] = useState(null as any);
  const [selectedScoogi, setSelectedScoogi] = useState(null as IScoogi | null);
  const [filters, setFilters] = useState([] as string[]);
  const history = useHistory();

  const onSubmit = async () => {
    if (!wallet) return;

    if (!selectedScoogi) return;

    const entry = (await doBattle(
      aggressor,
      selectedScoogi,
      wallet.publicKey.toString()
    )) as IBattleEntry;

    if (entry._id) {
      history.push(`/battle/${entry._id}`);
      return;
    }

    setError(entry);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    getFilters().then((response: IWinnerLoser[]) => {
      const winners = response
        .filter((it) => it.winner)
        .map((it: IWinnerLoser) => it.winner);
      const losers = response
        .filter((it) => it.loser)
        .map((it: IWinnerLoser) => it.loser);

      setFilters([...winners, ...losers]);
    });

    if (!wallet?.publicKey) {
      setSelectedScoogi(null);
    }
  }, [wallet]);

  return (
    <div className={`flex flex-col justify-center items-center`}>
      {!wallet ? (
        <WalletDialogButton
          style={{ fontFamily: 'Patrick Hand SC', margin: '3rem' }}
        >
          Connect Wallet
        </WalletDialogButton>
      ) : (
        <div className="w-full m-auto">
          <>
            {error && (
              <h2 className="text-red-500 p-3 w-full text-center text-3xl">
                {error.message}
              </h2>
            )}

            {!error && (
              <>
                <div className="flex justify-center items-center mt-5 mb-5 px-3">
                  <button
                    onClick={async () => await onSubmit()}
                    disabled={!selectedScoogi?.mint}
                    className={`${
                      selectedScoogi?.mint
                        ? 'bg-green-700 border-green-500 border hover:bg-green-500 hover:text-white hover:bg-green-500'
                        : 'cursor-not-allowed bg-gray-500'
                    }`}
                    style={{
                      textAlign: 'center',
                      padding: '2rem 0',
                      width: '100%',
                      display: 'inline-flex',
                      borderRadius: '2rem',
                      justifyContent: 'center'
                    }}
                  >
                    <h2 className="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                      ⚔️ Start Battle! 🥖
                    </h2>
                  </button>
                </div>
                <div className="flex flex-col items-center p-3">
                  <div>
                    <input
                      style={{
                        width: '1.5rem',
                        height: '1.5rem'
                      }}
                      type="radio"
                      id="aggressor"
                      name="aggressor"
                      className={`m-2`}
                      checked={aggressor}
                      onChange={() => setAggressor(true)}
                    />
                    <label className={`text-2xl`} htmlFor="aggressor">
                      Challengoooooor? (You challenged someone to battle)
                    </label>
                  </div>

                  <div>
                    <input
                      style={{
                        width: '1.5rem',
                        height: '1.5rem'
                      }}
                      type="radio"
                      id="challenged"
                      name="challenged"
                      className={`m-2`}
                      checked={!aggressor}
                      onChange={() => setAggressor(false)}
                    />
                    <label className={`text-2xl`} htmlFor="challenged">
                      Acceptoooooor? (Someone challenged you to battle)
                    </label>
                  </div>

                  <p>
                    If you need to enter as an challengooor and an acceptooor,
                    submit one Scoogi, then submit another.
                  </p>
                </div>

                <div className={`text-2xl text-center mb-4`}>
                  Select a Scoogi to battle
                </div>

                <PuffLoader
                  color={`#047857`}
                  size={500}
                  css={override}
                  loading={scoogisLoading}
                />

                {wallet && !myScoogis.length && scoogisLoaded && (
                  <div className="text-2xl text-center mx-auto">
                    <h2> No Scoogis :(</h2>
                    <div>
                      Scroll to the bottom of the page to find a Scoogi on the
                      open market!
                    </div>
                  </div>
                )}

                <div
                  className={`p-3`}
                  style={{
                    display: 'grid',
                    gap: 32,
                    gridTemplateColumns: width > 768 ? 'repeat(3, 1fr)' : '1fr'
                  }}
                >
                  {myScoogis
                    .filter((scoogi: IScoogi) => !filters.includes(scoogi.mint))
                    .map((scoogi: IScoogi) => (
                      <ScoogiCard
                        key={scoogi.mint}
                        currentScoogi={scoogi}
                        selectedScoogi={selectedScoogi || ({} as IScoogi)}
                        setSelectedScoogi={setSelectedScoogi}
                        rarities={rarities}
                      />
                    ))}
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export { BattleForm };
