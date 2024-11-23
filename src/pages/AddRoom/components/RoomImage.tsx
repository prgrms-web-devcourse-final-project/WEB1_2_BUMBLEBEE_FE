const RoomImage = () => {
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
              이미지 파일(JPG, JPEG)
            </span>
          </label>
        </div>
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
          multiple
          accept='image/png, image/jpeg'
          className='absolute h-0 w-0 border-0'
        />
      </div>
    </div>
  );
};

export default RoomImage;
