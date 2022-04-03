import {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {register_mutation} from '../../../api/schemas';
import {UserRegisterResponse} from '../../../types/user/register.response.type';
import {useAuth} from '../../../utils/auth/auth';
import {RegisterInput} from './register.screen';

const initialUserRegisterResponse: UserRegisterResponse = {
  register: {
    errors: [],
  },
};

export const useRegister = () => {
  const {signIn} = useAuth();
  const [data, setData] = useState(initialUserRegisterResponse);
  const [{}, signup] = useMutation(register_mutation);

  const onSubmit: SubmitHandler<RegisterInput> = async credentials => {
    const {data} = await signup(credentials);
    console.log(data.register.errors);

    setData(data);
    const token = data?.register?.token;

    if (!token) {
      signIn(token);
    }
  };

  return {onSubmit, data};
};
