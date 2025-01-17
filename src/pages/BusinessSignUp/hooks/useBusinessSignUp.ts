import { postBusinessSignUp } from '@apis/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'react';
import type { ErrorMsg } from '../components/BusinessSignUpForm';

const useBusinessSignUp = (
  setErrorMessage: Dispatch<React.SetStateAction<ErrorMsg>>,
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postBusinessSignUp,
    onSuccess: () => {
      navigate('/login/business');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        const { code } = error.response.data;
        const errors = {
          businessNumberError: '',
          nicknameError: '',
          emailError: '',
        };

        if (code === 'B006') {
          errors.nicknameError = '이미 존재하는 닉네임입니다.';
        }
        if (code === 'B004') {
          errors.emailError = '이미 가입된 이메일입니다.';
        }
        if (code === 'B005') {
          errors.businessNumberError = '이미 가입된 사업자 번호입니다.';
        }

        setErrorMessage(errors);
      }
    },
  });
};

export default useBusinessSignUp;
