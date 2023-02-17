import { AnchorWallet } from '@solana/wallet-adapter-react';

interface ICreator {
  share: number;
  address: string;
  verified: number;
}

interface ITokenData {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: ICreator[];
}

interface IMetadataProperties {
  files: IMetadataPropertiesFiles;
  category: string;
  creators: ICreator[];
}

interface IMetadataPropertiesFiles {
  type: string;
  src: string;
}

interface IMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
  attributes: any[];
  seller_fee_basis_points: number;
  update_authority: string;
  properties: IMetadataProperties;
}

interface IScoogi {
  tokenData: ITokenData;
  metadata: IMetadata;
  mint: string;
  wins: number;
  losses: number;
}

interface IBattleRecord {
  handle: string;
  wins: number;
  losses: number;
}

interface IBattleRecordDisplay {
  record: string;
}

interface Paginated<T> {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;
}

interface IBattleFormProps {
  wallet?: AnchorWallet;
  scoogisLoading: boolean;
  width: number;
  myScoogis: any[];
  scoogisLoaded: boolean;
}

interface IBattleEntry {
  _id: string;
  acceptedTweetId: string;
  aggressorAddress: string;
  aggressorHandle: string;
  aggressorId: string;
  aggressorScoogiMint: string;
  aggressorScoogiUri: string;
  challengeTweetId: string;
  challengedAddress: string;
  challengedHandle: string;
  challengedId: string;
  challengedScoogiMint: string;
  challengedScoogiUri: string;
  confirmationTweetId: string;
  dateChallenged: number;
  dmRequestedTweetId: string;
  interactionComplete: boolean;
  loser: string;
  matchStart: number;
  matchEnd: number;
  winner: string;
  winnerNotified: string;
}

interface IAlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

interface IScoogiCardProps {
  setSelectedScoogi: Function;
  selectedScoogi: IScoogi;
  currentScoogi: IScoogi;
  rarities: any[];
}

interface IWinnerLoser {
  _id: string;
  winner: string;
  loser: string;
}

export type {
  IScoogi,
  ICreator,
  ITokenData,
  IMetadataPropertiesFiles,
  IMetadataProperties,
  IMetadata,
  IBattleFormProps,
  IBattleEntry,
  IAlertState,
  IScoogiCardProps,
  IWinnerLoser,
  IBattleRecord,
  IBattleRecordDisplay,
  Paginated
};
