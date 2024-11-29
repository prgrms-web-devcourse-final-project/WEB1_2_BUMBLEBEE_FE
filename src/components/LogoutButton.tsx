import { postLogOut } from '@apis/auth';
import useAuthStore from '@store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { storeLogout } = useAuthStore();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postLogOut,
    onSuccess: () => {
      storeLogout();
      navigate('/');
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button
      type='button'
      className='h-[23px] self-start text-[12px] text-subfont underline active:text-black'
      onClick={handleClick}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
