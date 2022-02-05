import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {restorePassword_mutation} from '../../../api/schemas';
import {PasswordInput} from './password.screen';

export const usePassword = () => {
  // const {signIn} = useAuth();
  const [{}, restorePassword] = useMutation(restorePassword_mutation);

  const onSubmit: SubmitHandler<PasswordInput> = async input => {
    restorePassword(input);
  };

  return {onSubmit};
};
