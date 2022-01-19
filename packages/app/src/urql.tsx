import React, {ReactNode} from 'react';
import {createClient, Provider} from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

export const UrqlProvider = ({children}: {children: ReactNode}) => (
  <Provider value={client}>{children}</Provider>
);
