import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {login_mutation} from '../../../api/schemas';
import {useAuth} from '../../../utils/auth/auth';
import {LoginInput} from './login.screen';

export const useLogin = () => {
  const {signIn} = useAuth();
  const [{}, login] = useMutation(login_mutation);

  const onSubmit: SubmitHandler<LoginInput> = async credentials => {
    const {data} = await login(credentials);
    const token = data?.login?.token;

    if (!token) {
      // TODO:: alert login failed
    } else {
      signIn(token);
    }
  };

  return {onSubmit};
};
