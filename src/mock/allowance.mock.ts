import {Stash} from '../types/stash.type';

export const ALLOWANCE: Stash[] = [
  {
    id: 1,
    amount: 1,
    interval: 'day',
    start: new Date('2021-12-20T19:21:36.315Z'),
    nextEnrichment: new Date(),
  },
  {
    id: 2,
    amount: 2,
    interval: 'week',
    start: new Date('2021-10-10T19:21:36.315Z'),
    nextEnrichment: new Date(),
  },
  {
    id: 3,
    amount: 3,
    interval: 'month',
    start: new Date('2020-07-09T19:21:36.315Z'),
    nextEnrichment: new Date(),
  },
];
