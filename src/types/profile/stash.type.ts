import {Interval} from './interval.type';

export type Stash = {
  id: number;
  interval: Interval;
  amount: number;
  start: Date;
  nextEnrichment: Date;
  balance: number;
};
