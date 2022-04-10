import {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useMutation} from 'urql';
import {resetPassword_mutation} from '../../../api/auth/reset-password.mutation';
import {AuthResetPasswordResponse} from '../../../types/user/response.type';
import {PasswordInput} from './password.screen';

const initialUserRegisterResponse: AuthResetPasswordResponse = {
  sendResetPasswordEmail: {message: ''},
};

export const usePassword = () => {
  const [{}, resetPassword] = useMutation(resetPassword_mutation);
  const [data, setData] = useState(initialUserRegisterResponse);

  const onSubmit: SubmitHandler<PasswordInput> = async input => {
    const {data} = await resetPassword(input);
    setData(data || initialUserRegisterResponse);
  };

  return {data, onSubmit};
};
