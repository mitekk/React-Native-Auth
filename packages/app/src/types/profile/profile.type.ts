import {Stash} from './stash.type';

export type Profile = {
  name: string;
  allowance: Stash[];
  avatar: string;
  birthdate: Date;
  color: string;
};
