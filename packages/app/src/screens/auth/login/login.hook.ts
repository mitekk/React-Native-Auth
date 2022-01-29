import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {register_mutation} from '../../../api/schemas';
import {useAuth} from '../../../utils/auth/auth';
import {LoginInput} from './login.screen';

export const useLogin = () => {
  const {signIn} = useAuth();
  const [{}, signup] = useMutation(register_mutation);

  const onSubmit: SubmitHandler<LoginInput> = async credentials => {
    const {data} = await signup(credentials);
    const token = data?.register?.token;

    if (!token) {
      // TODO:: alert login failed
    } else {
      signIn(token);
    }
  };

  return {onSubmit};
};
