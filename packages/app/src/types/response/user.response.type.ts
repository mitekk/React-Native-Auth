export type Allowance = {
  id: string;
  amount: number;
  initBalance: number;
  interval: string;
  startFrom: string;
};

export type Profile = {
  id: string;
  name: string;
  birthdate: string;
  avatar: string;
  color: string;
  mediaUri: string;
  themePref: string;
  balance: number;
  allowances: Allowance[];
};

export type UserResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    verified: string;
    profiles: Profile[];
  };
};
