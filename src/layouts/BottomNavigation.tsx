import { AiFillHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { BiUser } from 'react-icons/bi';
import useAuthStore from '@store/authStore';
import { getRole } from '@utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLogin } = useAuthStore();
  const role = getRole();
  const myPagePath = role === 'ROLE_USER' ? '/user-page' : '/host-page';

  const navigationItems = [
    { icon: <AiFillHome />, label: '홈', path: '/' },
    {
      icon: <BsChatDots />,
      label: '문의',
      path: isLogin ? '/chat-list' : '/start',
    },
    { icon: <CgSearch />, label: '검색', path: '/search' },
    {
      icon: <BiUser />,
      label: '마이페이지',
      path: isLogin ? myPagePath : '/start',
    },
  ];

  // 현재 경로를 기준으로 활성화된 탭 설정
  const activeTab =
    navigationItems.find((item) => item.path === location.pathname)?.label ||
    '홈';

  const handleMovePage = (path: string) => {
    if (!isLogin && (path === '/chat-list' || path === myPagePath)) {
      navigate(path);
      return;
    }
    navigate(path);
  };

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
      {navigationItems.map(({ icon, label, path }) => (
        <button
          type='button'
          key={label}
          className={`flex w-[45px] cursor-pointer flex-col items-center ${
            activeTab === label ? 'text-primary' : 'text-focusColor'
          }`}
          onClick={() => handleMovePage(path)}
        >
          <div className='text-[20px]'>{icon}</div>
          <p className='mt-1 text-[10px]'>{label}</p>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
