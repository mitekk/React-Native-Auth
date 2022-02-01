import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {login_mutation} from '../../../api/schemas';
import {useAuth} from '../../../utils/auth/auth';
import {PasswordInput} from './password.screen';

export const usePassword = () => {
  // const {signIn} = useAuth();
  // const [{}, login] = useMutation(login_mutation);

  const onSubmit: SubmitHandler<PasswordInput> = async ({email}) => {
    console.log(`send email to ${email}`);
  };

  return {onSubmit};
};
