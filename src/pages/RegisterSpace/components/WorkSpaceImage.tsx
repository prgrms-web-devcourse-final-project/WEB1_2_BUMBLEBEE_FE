import { ChangeEvent } from 'react';
import { Space } from '@typings/types';

interface WorkSpaceImageProps {
  changeFormdata: (data: Partial<Space>) => void;
  spaceFormData: Space;
}

const WorkSpaceImage = ({
  changeFormdata,
  spaceFormData,
}: WorkSpaceImageProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    changeFormdata({
      spaceImage: {
        file: e.target.files[0],
        url: '',
      },
    });
  };

  return (
    <div className='mt-[40px] flex flex-col'>
      <div className='mt-[6px]'>
        <label
          htmlFor='image'
          className='mb-[6px] flex justify-between text-[14px] font-normal'
        >
          사업장 사진 등록
          <span className='text-[12px] text-[#8b8b8b]'>
            JPG, JPEG, PNG 중 1개 가능
          </span>
        </label>
        <div>
          <input
            name='image'
            className='mb-[10px] mr-[12px] h-[38px] w-[234px] border-b border-solid border-subfont px-[6px] py-[5.5px] text-[14px] focus:outline-none'
            value={
              spaceFormData.spaceImage.file?.name ??
              spaceFormData.spaceImage.url.split('/').pop() ??
              ''
            }
            readOnly
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
            accept='image/png, image/jpeg, image/jpg'
            className='absolute h-0 w-0 border-0'
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceImage;
