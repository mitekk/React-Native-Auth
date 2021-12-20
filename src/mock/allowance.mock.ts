import {Stash} from '../types/stash.type';

export const ALLOWANCE: Stash[] = [
  {
    id: 1,
    amount: 1,
    interval: 'day',
    start: new Date(),
    nextEnrichment: new Date(),
  },
  {
    id: 2,
    amount: 2,
    interval: 'week',
    start: new Date(),
    nextEnrichment: new Date(),
  },
  {
    id: 3,
    amount: 3,
    interval: 'month',
    start: new Date(),
    nextEnrichment: new Date(),
  },
];
