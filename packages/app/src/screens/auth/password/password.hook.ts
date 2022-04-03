import {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {restorePassword_mutation} from '../../../api/schemas';
import {UserRestorePasswordResponse} from '../../../types/user/response.type';
import {PasswordInput} from './password.screen';

const initialUserRegisterResponse: UserRestorePasswordResponse = {
  sendRestorePasswordEmail: {message: ''},
};

export const usePassword = () => {
  const [{}, restorePassword] = useMutation(restorePassword_mutation);
  const [data, setData] = useState(initialUserRegisterResponse);

  const onSubmit: SubmitHandler<PasswordInput> = async input => {
    const {data} = await restorePassword(input);
    setData(data);
  };

  return {data, onSubmit};
};
