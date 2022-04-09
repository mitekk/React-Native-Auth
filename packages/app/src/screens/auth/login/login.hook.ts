import {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {login_mutation} from '../../../api/schemas';
import {useAuth} from '../../../hooks/auth.hook';
import {AuthLoginResponse} from '../../../types/user/response.type';
import {LoginInput} from './login.screen';

const initialUserLoginResponse: AuthLoginResponse = {
  login: {
    accessToken: '',
    refreshToken: '',
    errors: [],
  },
};

export const useLogin = () => {
  const {signIn} = useAuth();
  const [data, setData] = useState(initialUserLoginResponse);
  const [{}, login] = useMutation(login_mutation);

  const onSubmit: SubmitHandler<LoginInput> = async credentials => {
    const {data} = await login(credentials);

    setData(data || initialUserLoginResponse);
    const accessToken = data?.login?.accessToken;

    if (accessToken) {
      signIn(accessToken);
    }
  };

  return {data, onSubmit};
};
