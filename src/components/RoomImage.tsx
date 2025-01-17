import { ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';

interface RoomImagesProps {
  roomImages: { url: string; file: File | null }[];
  onUpdateImages: (images: { url: string; file: File | null }[]) => void;
}

const RoomImage = ({ roomImages, onUpdateImages }: RoomImagesProps) => {
  // 룸 이미지 등록
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const fileList = Array.from(e.target.files).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    onUpdateImages([...roomImages, ...fileList].slice(0, 4)); // 4개까지 가능
  };

  const handleDelete = (imgUrl: string) => {
    const newImages = roomImages.filter(({ url }) => url !== imgUrl);
    onUpdateImages(newImages);
    URL.revokeObjectURL(imgUrl);
  };

  return (
    <div className='mt-[40px] flex flex-col'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <label
            htmlFor='image'
            className='text-[14px] font-normal'
          >
            룸 사진 등록
            <span className='ml-[6px] text-[12px] text-[#8b8b8b]'>
              JPG, JPEG, PNG, 최대 4장
            </span>
          </label>
        </div>
        <label
          htmlFor='images'
          className='inline-block h-[38px] w-[84px] justify-center rounded-[8px] bg-primary px-[11px] py-[10px] text-center text-[12px] font-medium text-white'
        >
          이미지 등록
        </label>
        <input
          id='images'
          name='images'
          type='file'
          multiple
          accept='image/jpeg, image/jpg, image/png'
          className='absolute h-0 w-0 border-0'
          onChange={handleChange}
        />
      </div>
      <div className='mt-[10px] flex'>
        {roomImages?.map(({ url }) => (
          <div
            key={url}
            className='group relative'
          >
            <img
              src={url}
              alt=''
              className='h-[82.5px] w-[82.5px] object-cover'
            />
            <button
              type='button'
              className='absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center bg-black text-white opacity-50 group-hover:flex'
              onClick={() => handleDelete(url)}
            >
              <IoMdClose size='40px' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomImage;
