import {
  IBattleRecord,
  IBattleRecordDisplay,
  IScoogi,
  Paginated
} from '../utils/types';
import { AxiosResponse } from 'axios';
import { axios } from '../utils/http';

const battleRecordUrl =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080/api/battle-record'
    : `${process.env.REACT_APP_BATTLE_API_URL}/api/battle-record`;

const scoogiUrl =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:8080/api/scoogi'
    : `${process.env.REACT_APP_BATTLE_API_URL}/api/scoogi`;

export const getTwitterLeaderList = async (
  handle = '',
  page: number
): Promise<Paginated<IBattleRecord>> => {
  const {
    data
  }: AxiosResponse<Paginated<IBattleRecord>, any> = await axios.get(
    `${battleRecordUrl}/?page=${page}${handle ? '&handle=' + handle : ''}`
  );

  return data;
};

export const getWinnerScoogis = async (
  name = '',
  page: number
): Promise<Paginated<IScoogi>> => {
  const {
    data
  }: AxiosResponse<Paginated<IScoogi>, any> = await axios.get(
    `${scoogiUrl}/winners/?page=${page}${name ? '&name=' + name : ''}`
  );

  return data;
};

export const getLoserScoogis = async (
  name = '',
  page: number
): Promise<Paginated<IScoogi>> => {
  const {
    data
  }: AxiosResponse<Paginated<IScoogi>, any> = await axios.get(
    `${scoogiUrl}/losers/?page=${page}${name ? '&name=' + name : ''}`
  );

  return data;
};

export const getVirginScoogis = async (
  name = '',
  page: number
): Promise<Paginated<IScoogi>> => {
  const {
    data
  }: AxiosResponse<Paginated<IScoogi>, any> = await axios.get(
    `${scoogiUrl}/battle-virgins/?page=${page}${name ? '&name=' + name : ''}`
  );

  return data;
};

export const getBattleRecord = async (
  handle: string
): Promise<IBattleRecordDisplay> => {
  const { data }: AxiosResponse<IBattleRecord, any> = await axios.get(
    `${battleRecordUrl}/${handle}`
  );

  return { record: `(${data.wins} - ${data.losses})` };
};
