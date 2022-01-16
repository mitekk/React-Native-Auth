import {Stash} from './stash.type';

export type Profile = {
  nickname: string;
  allowance: Stash[];
  avatar: string;
  birthdate: Date;
  color: string;
};
