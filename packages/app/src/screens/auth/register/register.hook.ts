import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {register_mutation} from '../../../api/schemas';
import {useAuth} from '../../../utils/auth/auth';
import {RegisterInput} from './register.screen';

export const useRegister = () => {
  const {signIn} = useAuth();
  const [{}, signup] = useMutation(register_mutation);

  const onSubmit: SubmitHandler<RegisterInput> = async credentials => {
    console.log(credentials);

    const {data} = await signup(credentials);
    const token = data?.register?.token;

    console.log(data);

    if (!token) {
      // TODO:: alert register failed
    } else {
      signIn(token);
    }
  };

  return {onSubmit};
};
