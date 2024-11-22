import { ChangeEvent, useState } from 'react';

const WorkSpaceImage = () => {
  //   const ALLOW_FILE_EXTENSION = 'jpg,jpeg,png';
  const [fileName, setFileName] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className='mt-[40px] flex flex-col'>
      <div className='mt-[6px]'>
        <label
          htmlFor='image'
          className='mb-[6px] text-[14px] font-normal'
        >
          사업장 사진 등록
        </label>
        <div>
          <input
            name='image'
            className='mb-[10px] mr-[12px] h-[38px] w-[234px] border-b border-solid border-subfont px-[6px] py-[5.5px] text-[14px] focus:outline-none'
            value={fileName}
          />
          <label
            htmlFor='file'
            className='inline-block h-[38px] w-[84px] justify-center rounded-[8px] bg-primary px-[11px] py-[10px] text-center text-[12px] font-medium text-white'
          >
            이미지 등록
          </label>
          <input
            id='file'
            name='file'
            type='file'
            accept='image/png, image/jpeg'
            className='absolute h-0 w-0 border-0'
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceImage;
