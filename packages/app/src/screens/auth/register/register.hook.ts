import {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {register_mutation} from '../../../api/auth/register.mutation';
import {useAuth} from '../../../hooks/auth.hook';
import {AuthRegisterResponse} from '../../../types/response/auth.response.type';
import {RegisterInput} from './register.screen';

const initialUserRegisterResponse: AuthRegisterResponse = {
  register: {
    accessToken: '',
    refreshToken: '',
    errors: [],
  },
};

export const useRegister = () => {
  const {signIn} = useAuth();
  const [data, setData] = useState(initialUserRegisterResponse);
  const [{}, signup] = useMutation(register_mutation);

  const onSubmit: SubmitHandler<RegisterInput> = async credentials => {
    const {data} = await signup(credentials);

    setData(data || initialUserRegisterResponse);
    const accessToken = data?.register?.accessToken;
    const refreshToken = data?.register?.refreshToken;

    if (accessToken && refreshToken) {
      signIn(accessToken, refreshToken);
    }
  };

  return {data, onSubmit};
};
