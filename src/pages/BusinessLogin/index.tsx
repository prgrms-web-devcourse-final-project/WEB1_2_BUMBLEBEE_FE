import { useNavigate } from 'react-router-dom';

const BusinessLogin = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate('/signup/business');
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

export default BusinessLogin;
