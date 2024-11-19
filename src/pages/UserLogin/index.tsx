import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate('/signup/user');
  };
  return (
    <>
      <button
        type='button'
        onClick={handleSignUpClick}
      >
        회원가입
      </button>
    </>
  );
};

export default UserLogin;
