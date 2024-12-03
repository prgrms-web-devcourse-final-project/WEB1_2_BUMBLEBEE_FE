import { ToastContainer } from 'react-toastify';
import '../index.css';

const Toastify = () => {
  return (
    <ToastContainer
      position='top-center'
      autoClose={3000}
      closeOnClick
      pauseOnHover={false}
      limit={1}
      className='w-full max-w-sm'
      toastClassName={() =>
        'relative flex items-center justify-between p-4 rounded-lg bg-white text-black'
      }
      progressStyle={{ backgroundColor: '#50BEAD' }}
    />
  );
};

export default Toastify;
