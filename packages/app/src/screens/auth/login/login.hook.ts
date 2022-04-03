import {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {login_mutation} from '../../../api/schemas';
import {UserLoginResponse} from '../../../types/user/register.response.type';
import {useAuth} from '../../../utils/auth/auth';
import {LoginInput} from './login.screen';

const initialUserLoginResponse: UserLoginResponse = {
  login: {
    errors: [],
  },
};

export const useLogin = () => {
  const {signIn} = useAuth();
  const [data, setData] = useState(initialUserLoginResponse);
  const [{}, login] = useMutation(login_mutation);

  const onSubmit: SubmitHandler<LoginInput> = async credentials => {
    const {data} = await login(credentials);
    setData(data);
    const token = data?.login?.token;

    if (token) {
      signIn(token);
    }
  };

  return {data, onSubmit};
};
