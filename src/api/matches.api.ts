import axios, { AxiosResponse } from 'axios';
import { integer, MersenneTwister19937 } from 'random-js';
import { IScoogi, IBattleEntry, IWinnerLoser } from '../utils/types';

const matchUrl =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080/api/match'
    : `${process.env.REACT_APP_BATTLE_API_URL}/api/match`;

const scoogiUrl =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080/api/scoogi'
    : `${process.env.REACT_APP_BATTLE_API_URL}/api/scoogi`;

const battleRecordUrl =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080/api/battle-record'
    : `${process.env.REACT_APP_BATTLE_API_URL}/api/battle-record`;

export const doBattle = async (
  aggressor: boolean,
  scoogi: IScoogi,
  userAddress: string
): Promise<IBattleEntry | Error> => {
  try {
    const entry = await getBattleEntry(aggressor, userAddress);
    const canProceed = await isScoogiValidContestant(scoogi.mint);

    if (!entry._id) {
      throw new Error('Valid entry not found.');
    }

    if (!canProceed) {
      throw new Error('This Scoogi is not a valid battle contestant.');
    }

    const updatedEntry = await updateAddresses(
      aggressor,
      scoogi,
      userAddress,
      entry
    );

    if (!updatedEntry?._id) {
      throw new Error('This Scoogi is not a valid battle contestant.');
    }

    if (entryReadyForBattle(updatedEntry)) {
      await pickWinner(updatedEntry);
      return updatedEntry;
    } else {
      return updatedEntry;
    }
  } catch (e) {
    return new Error('This Scoogi is not a valid battle contestant.');
  }
};

const isScoogiValidContestant = async (mint: string): Promise<boolean> => {
  const { data }: AxiosResponse<{ canProceed: boolean }, any> = await axios.get(
    `${matchUrl}/${mint}/awaiting-battle`
  );

  return data.canProceed;
};

export const getFilters = async (): Promise<IWinnerLoser[]> => {
  const { data }: AxiosResponse<IWinnerLoser[], any> = await axios.get(
    `${matchUrl}/winners-losers`
  );

  return data;
};

const getBattleEntry = async (
  aggressor: boolean,
  userAddress: string
): Promise<IBattleEntry> => {
  const { data }: AxiosResponse<IBattleEntry, any> = await axios.get(
    `${matchUrl}/${userAddress}/${aggressor}/start`
  );

  return data;
};

const entryReadyForBattle = ({
  challengedScoogiMint,
  aggressorScoogiMint
}: IBattleEntry): boolean => !!(challengedScoogiMint && aggressorScoogiMint);

export const getBattleDetail = async (id: string) => {
  console.log(`Fetching battle details entry...`);
  const { data }: AxiosResponse<IBattleEntry, any> = await axios.get(
    `${matchUrl}/${id}/entry`
  );

  return data;
};

const updateAddresses = async (
  aggressor: boolean,
  scoogi: IScoogi,
  userAddress: string,
  entry: IBattleEntry
): Promise<IBattleEntry> => {
  const patchDTO = aggressor
    ? {
        aggressorScoogiMint: scoogi.mint || '',
        aggressorScoogiUri: scoogi.metadata.image
      }
    : {
        challengedScoogiMint: scoogi.mint || '',
        challengedScoogiUri: scoogi.metadata.image
      };

  console.log(`Updating entry with User and Scoogi addresses...`);
  const { data }: AxiosResponse<IBattleEntry, any> = await axios.patch(
    `${matchUrl}/${entry._id}/addresses`,
    patchDTO
  );

  return data;
};

const pickWinner = async (entry: IBattleEntry) => {
  let winnerMint = '';
  let loserMint = '';
  let winnerHandle = '';
  let loserHandle = '';

  const {
    _id,
    aggressorScoogiMint,
    challengedScoogiMint,
    aggressorHandle,
    challengedHandle
  } = entry;

  console.log(`Calculating winner...`);
  if (integer(0, 1)(MersenneTwister19937.autoSeed())) {
    winnerMint = aggressorScoogiMint;
    winnerHandle = aggressorHandle;
    loserMint = challengedScoogiMint;
    loserHandle = challengedHandle;
  } else {
    winnerMint = challengedScoogiMint;
    winnerHandle = challengedHandle;
    loserMint = aggressorScoogiMint;
    loserHandle = aggressorHandle;
  }

  await axios.patch(`${scoogiUrl}/${winnerMint}/add-win`);
  await axios.patch(`${battleRecordUrl}/${winnerHandle}/add-win`);
  await axios.patch(`${scoogiUrl}/${loserMint}/add-loss`);
  await axios.patch(`${battleRecordUrl}/${loserHandle}/add-loss`);

  const patchDto: Pick<IBattleEntry, 'winner' | 'loser'> = {
    winner: winnerMint,
    loser: loserMint
  };
  const { data } = await axios.patch(
    `${matchUrl}/${_id}/winner-loser`,
    patchDto
  );

  return data;
};
